import React, { Component } from "react";
import AssetSelector from "../components/AssetSelector/AssetSelector";
import NewProduct from "../components/NewProduct/NewProduct";

import ImageUpload from "../components/ImageUpload/ImageUpload";
import NewProject from "../components/NewProject/NewProject";
import NewDrawing from "../components/NewDrawing/NewDrawing";
import AuthContext from "../context/authContext";

class AdminsPage extends Component {
  constructor(props) {
    super(props);
    this.subCatEl = React.createRef();
    this.groupEl = React.createRef();
    this.descEl = React.createRef();
    this.projectEl = React.createRef();
    this.projDescEl = React.createRef();
  }
  static contextType = AuthContext;
  state = { creatingAsset: "none", images: [] };
  selectTypeHandler = e => {
    this.setState({ creatingAsset: e.target.value });
  };
  selecImageHandler = images => {
    this.setState(prevState => {
      return { images: [images] };
    });
    console.log(images);
    console.log(this.state.images);
  };
  slug = words => {
    return words
      .split(" ")
      .map(w => w.toLowerCase())
      .join("_");
  };
  confirmProduct = e => {
    e.preventDefault();
    const token = this.context.token;
    const name = this.subCatEl.current.value;
    const group = this.groupEl.current.value;
    const description = this.descEl.current.value;
    const subCat = this.slug(name);
    const mainPhotos = [...this.state.images];
    const product = { name, subCat, group, description, mainPhotos };
    const requestBody = { ...product };
    fetch("/api/products", {
      method: "POST",
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
      .then(resData => this.setState({ creatingAsset: "none" }))
      .catch(err => {
        console.log(err);
      });
  };
  confirmProject = e => {
    e.preventDefault();
    const name = this.projectEl.current.value;
    const description = this.projDescEl.current.value;
    const token = this.context.token;
    const requestBody = { name, description };
    fetch("/api/projects", {
      method: "POST",
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
      .then(resData => this.setState({ creatingAsset: "none" }))
      .catch(err => {
        console.log(err);
      });
  };
  endUploadProcess = () => {
    this.setState({ creatingAsset: "none" });
  };

  render() {
    return (
      <div className="container">
        <AssetSelector assetSelection={this.selectTypeHandler} />
        {this.state.creatingAsset === "product" && (
          <NewProduct
            onConfirm={this.confirmProduct}
            subCatInput={this.subCatEl}
            groupInput={this.groupEl}
            descInput={this.descEl}
          />
        )}
        {this.state.creatingAsset === "photo" && (
          <ImageUpload uploaded={this.endUploadProcess} />
        )}
        {this.state.creatingAsset === "project" && (
          <NewProject
            onConfirm={this.confirmProject}
            projectInput={this.projectEl}
            projDescInput={this.projDescEl}
          />
        )}
        {this.state.creatingAsset === "drawing" && <NewDrawing />}
      </div>
    );
  }
}

export default AdminsPage;
