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
    console.log(
      `http://localhost:5000/api/products/${this.props.selectedProduct}`
    );
    // this.setState({ isLoading: true });
    fetch(`http://localhost:5000/api/products/${this.props.selectedProduct}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ product: resData.products, isLoading: false });
        console.log(this.state.product[0]);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <div>
        product page
        {!this.state.isLoading && (
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
