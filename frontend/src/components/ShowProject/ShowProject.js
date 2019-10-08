import React, { Component } from "react";
import CardDeck from "../CardsDeck/CardsDeck";
import EditProject from "../EditProject/EditProject";

class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.projectEl = React.createRef();
    this.projDescEl = React.createRef();
    this.categoryEl = React.createRef();
    this.state = {
      isEditing: false,
      photos: []
    };
  }
  editingProject = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };
  imageHandler = list => {
    const src = [];
    list.map(item => {
      src.push(item.src);
      return src;
    });
    this.setState({ photos: src });
  };
  confirmEdit = e => {
    e.preventDefault();
    console.log(`/api/projects/${this.props.project._id}`);
    console.log(this.state);
    const name = this.projectEl.current.value;
    const description = this.projDescEl.current.value;
    const products = this.categoryEl.current.value;
    const photos = this.state.photos;
    const requestBody = { name, description, products, photos };

    fetch(`/api/projects/${this.props.project._id}`, {
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
      <div>
        <div className="modal-close" onClick={this.props.closeModal}>
          Close
        </div>
        <button
          className="btn btn-sm btn-warning float-right"
          onClick={this.editingProject}
        >
          Edit
        </button>
        {!this.state.isEditing && (
          <div>
            <h1 className="display-4 text-center m-4">
              {captialize(this.props.project.name)}
            </h1>
            <div className="my-5">
              <p>{this.props.project.description}</p>
            </div>
            {this.props.project.photos.length > 0 && (
              <div>
                <CardDeck images={this.props.project.photos} />
              </div>
            )}
          </div>
        )}

        {this.state.isEditing && (
          <EditProject
            project={this.props.project}
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
