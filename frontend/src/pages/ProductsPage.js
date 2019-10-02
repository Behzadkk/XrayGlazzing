import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import ShowProduct from "../components/ShowProduct/ShowProduct";
import EditProduct from "../components/EditProduct/EditProduct";

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: null,
      link: null,
      isEditing: false
    };
    this.subCatEl = React.createRef();
    this.groupEl = React.createRef();
    this.descEl = React.createRef();
  }

  componentDidMount() {
    this.fetchProduct();
  }

  static getDrivedStateFromProps(props, state) {
    console.log(props);
    console.log(state);
    if (props.selectedProduct !== state.product.subCat) {
      return {
        link: props.selectedProduct
      };
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedProduct !== this.props.selectedProduct) {
      this.setState({ isEditing: false });
      this.fetchProduct();
    }
  }

  fetchProduct = () => {
    this.setState({ isLoading: true });
    fetch(`http://localhost:5000/api/products/${this.props.selectedProduct}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.products);
        this.setState({ product: resData.products, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  editingProduct = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };
  selecImageHandler = list => {
    const src = [];
    list.map(item => {
      src.push(item.src);
    });
    this.setState({ mainPhotos: src });
    console.log(this.state.mainPhotos);
  };
  confirmEdit = e => {
    e.preventDefault();
    console.log(
      `http://localhost:5000/api/products/${this.props.selectedProduct}`
    );
    const subCat = this.subCatEl.current.value;
    const group = this.groupEl.current.value;
    const description = this.descEl.current.value;
    const mainPhotos = this.state.mainPhotos;
    const product = { subCat, group, description, mainPhotos };
    const requestBody = { ...product };
    console.log(requestBody);
    fetch(`http://localhost:5000/api/products/${this.props.selectedProduct}`, {
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
      //   .then(resData => alert(resData.toString() + "added to databe"))
      .catch(err => {
        console.log(err);
      });
    this.setState({ isEditing: false });
  };
  render() {
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ShowProduct product={this.state.product[0]} />
        )}
        <button
          className="btn btn-sm btn-warning"
          onClick={this.editingProduct}
        >
          Edit
        </button>
        {this.state.isEditing && (
          <EditProduct
            product={this.state.product[0]}
            onConfirm={this.confirmEdit}
            subCatInput={this.subCatEl}
            groupInput={this.groupEl}
            descInput={this.descEl}
            selectedImages={this.selecImageHandler}
          />
        )}
      </div>
    );
  }
}

export default ProductsPage;
