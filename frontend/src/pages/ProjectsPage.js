import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import ProjectList from "../components/ProjectList/ProjectList";

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
    this.setState({ selectedProject: project });
  };
  closeModal = () => {
    this.setState({ selectedProject: null });
  };
  fetchProjects = () => {
    let api = "/api/projects";
    if (this.props.match.params.product) {
      api = "/api/" + this.props.match.params.product + "/projects";
    }
    this.setState({ isLoading: true });
    fetch(api)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
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
      </div>
    );
  }
}

export default ProjectsPage;
