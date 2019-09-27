import React, { Component } from "react";

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: null,
      link: null
    };
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
        this.setState({ product: resData.products, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1>{this.state.product[0].subCat}</h1>
            <p>{this.state.product[0].description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default ProductsPage;
