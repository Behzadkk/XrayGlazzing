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
      isEditing: false,
      banner: "",
      mainPhotos: ""
    };
    this.subCatEl = React.createRef();
    this.groupEl = React.createRef();
    this.descEl = React.createRef();
    this.keyFeatureEl = React.createRef();
    this.moreInfoEl = React.createRef();
    this.subHeadEl = React.createRef();
    this.moreDetailsEl = React.createRef();
  }

  componentDidMount() {
    this.fetchProduct();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.product !== this.props.match.params.product) {
      this.setState({ isEditing: false });
      this.fetchProduct();
    }
  }

  fetchProduct = () => {
    this.setState({ isLoading: true });
    fetch(`/api/products/${this.props.match.params.product}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ product: resData.products, isLoading: false });
        console.log(resData);
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
  selecImageHandler = photo => {
    this.setState({ mainPhotos: photo.src });
  };
  bannerImageHandler = photo => {
    this.setState({ banner: photo.src });
  };
  confirmEdit = e => {
    e.preventDefault();

    const subCat = this.subCatEl.current.value;
    const group = this.groupEl.current.value;
    const description = this.descEl.current.value;
    const keyFeatures = this.keyFeatureEl.current.value;
    const moreInfo = this.moreInfoEl.current.value;
    const subHeading = this.subHeadEl.current.value;
    const moreDetails = this.moreDetailsEl.current.value;
    const mainPhotos = this.state.mainPhotos;
    const banner = this.state.banner;
    const product = {
      subCat,
      group,
      description,
      keyFeatures,
      moreInfo,
      subHeading,
      moreDetails,
      mainPhotos,
      banner
    };
    const requestBody = { ...product };

    fetch(`/api/products/${product.subCat}`, {
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
      <div className="">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ShowProduct
            product={this.state.product[0]}
            photos={this.state.product[1]}
          />
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
            photos={this.state.product[1].photos}
            onConfirm={this.confirmEdit}
            subCatInput={this.subCatEl}
            groupInput={this.groupEl}
            descInput={this.descEl}
            keyFeatureInput={this.keyFeatureEl}
            moreInfoInput={this.moreInfoEl}
            subHeadInput={this.subHeadEl}
            moreDetailsInput={this.moreDetailsEl}
            selectedImages={this.selecImageHandler}
            bannerImage={this.bannerImageHandler}
          />
        )}
      </div>
    );
  }
}

export default ProductsPage;
