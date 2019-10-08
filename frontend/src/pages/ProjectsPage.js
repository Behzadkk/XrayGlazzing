import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import ProjectList from "../components/ProjectList/ProjectList";
import Backdrop from "../components/Backdrop/Backdrop";
import ShowProject from "../components/ShowProject/ShowProject";
import Modal from "../components/Modal/Modal";

class ProjectsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      projects: [],
      selectedProject: null
    };
  }
  componentDidMount() {
    this.fetchProjects();
  }
  projectViewHandler = project => {
    console.log(project);
    this.setState({ selectedProject: project });
  };
  closeModal = () => {
    this.setState({ selectedProject: null });
  };
  fetchProjects = () => {
    const endpoint = this.props.match.params.product || "";
    this.setState({ isLoading: true });
    fetch("/api/projects/" + endpoint)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.projects);
        this.setState({ isLoading: false, projects: resData.projects });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  render() {
    return (
      <div className="container">
        <h1 className="display-3 text-center m-5">Recent Projects</h1>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ProjectList
            projects={this.state.projects}
            projectpreview={this.projectViewHandler}
          />
        )}
        {this.state.selectedProject && (
          <div>
            <Modal>
              <ShowProject
                project={this.state.selectedProject}
                closeModal={this.closeModal}
              />
            </Modal>
            <Backdrop />
          </div>
        )}
      </div>
    );
  }
}

export default ProjectsPage;
