import React, { Component } from "react";
import NewProduct from "../components/NewProduct/NewProduct";

class AdminsPage extends Component {
  constructor(props) {
    super(props);
    this.subCatEl = React.createRef();
    this.groupEl = React.createRef();
    this.descEl = React.createRef();
  }

  state = { creatingAsset: null };
  confirmProduct = e => {
    e.preventDefault();
    const subCat = this.subCatEl.current.value;
    const group = this.groupEl.current.value;
    const description = this.descEl.current.value;
    const product = { subCat, group, description };
    const requestBody = { ...product };
    fetch("http://localhost:5000/api/products", {
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
      <NewProduct
        onConfirm={this.confirmProduct}
        subCatInput={this.subCatEl}
        groupInput={this.groupEl}
        descInput={this.descEl}
      />
    );
  }
}

export default AdminsPage;
