import React, { Component } from "react";
import { Markup } from "interweave";
import EditProject from "../EditProject/EditProject";
import ProductGallery from "../ProductGallery/ProductGallery";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/authContext";
class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.projectEl = React.createRef();
    this.state = {
      isLoading: true,
      isEditing: false,
      photos: [],
      projects: [],
      products: [],
      projDesc: "",
      deleted: false
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    this.fetchProjects();
    console.log(this.context.token);
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
  productSelectHandler = productsList => {
    const productIds = productsList.map(p => p.value);
    this.setState({ products: productIds });
  };
  ProjDescHandler = value => {
    this.setState({ projDesc: value });
  };
  confirmEdit = e => {
    e.preventDefault();
    const name = this.projectEl.current.value;
    const description = this.state.projDesc;
    const photos = this.state.photos;
    const products = this.state.products;

    const requestBody = { name, description, photos, products };
    const token = this.context.token;

    fetch(`/api/projects/${this.state.projects[0]._id}`, {
      method: "PUT",
      body: JSON.stringify(requestBody),
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token
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

  deleteProjectHandler = () => {
    const id = this.state.projects[0]._id;
    const token = this.context.token;
    fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => this.setState({ deleted: true }))
      .catch(err => {
        console.log(err);
      });
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
                  <Markup content={this.state.projects[0].description} />
                </div>
              </div>
            </div>
            <div className="check">
              <ProductGallery photos={this.state.projects[1].photos} />
            </div>
          </div>
        )}

        {this.context.token && (
          <div>
            <button
              className="btn btn-sm btn-warning"
              onClick={this.editingProject}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={this.deleteProjectHandler}
            >
              Delete
            </button>
          </div>
        )}
        {this.state.isEditing && (
          <EditProject
            project={this.state.projects[0]}
            photos={this.state.projects[1].photos}
            onConfirm={this.confirmEdit}
            projectInput={this.projectEl}
            selectedImages={this.imageHandler}
            selectProducts={this.productSelectHandler}
            getEditorValue={this.ProjDescHandler}
          />
        )}
        {this.state.deleted && <Redirect to="/projects" exact />}
      </div>
    );
  }
}
export default ShowProject;
