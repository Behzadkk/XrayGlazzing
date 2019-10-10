import React, { Component } from "react";
import EditProject from "../EditProject/EditProject";
import ProductGallery from "../ProductGallery/ProductGallery";

class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.projectEl = React.createRef();
    this.projDescEl = React.createRef();
    this.categoryEl = React.createRef();
    this.state = {
      isLoading: true,
      isEditing: false,
      photos: [],
      projects: []
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.setState({ isLoading: true });
    fetch("/api/projects/" + this.props.match.params.id)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ isLoading: false, projects: resData.projects });
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: true });
      });
  }
  editingProject = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };
  imageHandler = image => {
    this.setState({ photos: image.src });
  };
  confirmEdit = e => {
    e.preventDefault();
    const name = this.projectEl.current.value;
    const description = this.projDescEl.current.value;
    const products = this.categoryEl.current.value;
    const photos = this.state.photos;
    const requestBody = { name, description, products, photos };
    console.log(requestBody);
    fetch(`/api/projects/${this.state.projects[0]._id}`, {
      method: "PUT",
      body: JSON.stringify(requestBody),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ isEditing: false });
  };
  render() {
    return (
      <div className="container">
        {!this.state.isLoading && (
          <div>
            <h1 className="text-center m-5">
              {this.state.projects[0].name.toUpperCase()}
            </h1>
            <div className="row">
              <div className="col-md-9">
                <div className="my-5">
                  <p>{this.state.projects[0].description}</p>
                </div>
              </div>
            </div>
            <div className="check">
              <ProductGallery photos={this.state.projects[1].photos} />
            </div>
          </div>
        )}
        <button
          className="btn btn-sm btn-warning"
          onClick={this.editingProject}
        >
          Edit
        </button>
        {this.state.isEditing && (
          <EditProject
            project={this.state.projects[0]}
            photos={this.state.projects[1].photos}
            onConfirm={this.confirmEdit}
            projectInput={this.projectEl}
            projDescInput={this.projDescEl}
            categoryInput={this.categoryEl}
            selectedImages={this.imageHandler}
          />
        )}
      </div>
    );
  }
}
export default ShowProject;

function captialize(words) {
  return words
    .split("_")
    .map(w => w.substring(0, 1).toUpperCase() + w.substring(1))
    .join(" ");
}
