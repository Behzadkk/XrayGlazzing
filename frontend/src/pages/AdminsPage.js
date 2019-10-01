import React, { Component } from "react";
import AssetSelector from "../components/AssetSelector/AssetSelector";
import NewProduct from "../components/NewProduct/NewProduct";
import GalleryImagePicker from "../components/GalleryImagePicker/GalleryImagePicker";
import ImageUpload from "../components/ImageUpload/ImageUpload";

class AdminsPage extends Component {
  constructor(props) {
    super(props);
    this.subCatEl = React.createRef();
    this.groupEl = React.createRef();
    this.descEl = React.createRef();
  }

  state = { creatingAsset: "photo", images: [] };
  selectTypeHandler = e => {
    this.setState({ creatingAsset: e.target.value });
  };

  confirmProduct = () => {
    const subCat = this.subCatEl.current.value;
    const group = this.groupEl.current.value;
    const description = this.descEl.current.value;
    const product = { subCat, group, description };
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
      //   .then(resData => alert(resData.toString() + "added to databe"))
      .catch(err => {
        console.log(err);
      });
  };

  imageHandler = images => {
    console.log(images);
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
        <ImageUpload />
        <GalleryImagePicker selectedImages={this.imageHandler} />
      </div>
    );
  }
}

export default AdminsPage;
