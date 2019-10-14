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
  state = { creatingAsset: "photo", images: [] };
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
  confirmProduct = () => {
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
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => alert(resData.toString() + "added to databe"))
      .catch(err => {
        console.log(err);
      });
  };
  confirmProject = () => {
    const name = this.projectEl.current.value;
    const description = this.projDescEl.current.value;
    const requestBody = { name, description };
    fetch("/api/projects", {
      method: "POST",
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
      .then(resData => alert(resData.toString() + "added to databe"))
      .catch(err => {
        console.log(err);
      });
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
        {this.state.creatingAsset === "photo" && <ImageUpload />}
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
