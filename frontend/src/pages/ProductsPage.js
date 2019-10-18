import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import ShowProduct from "../components/ShowProduct/ShowProduct";
import EditProduct from "../components/EditProduct/EditProduct";
import AuthContext from "../context/authContext";
import { Redirect } from "react-router-dom";

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: null,
      link: null,
      isEditing: false,
      banner: "",
      mainPhotos: "",
      deleted: false,
      description: "",
      keyFeatures: "",
      moreInfo: "",
      subHeading: "",
      moreDetails: "",
      images: [],
      LoadingGallery: true
    };
    this.subCatEl = React.createRef();
    this.groupEl = React.createRef();
  }
  static contextType = AuthContext;
  componentDidMount() {
    this.showProduct();
    this.fetchPhotos();
  }
  descEl = value => {
    this.setState({ description: value });
  };
  keyFeatureEl = value => {
    this.setState({ keyFeatures: value });
  };
  moreInfoEl = value => {
    this.setState({ moreInfo: value });
  };
  subHeadEl = value => {
    this.setState({ subHeading: value });
  };
  moreDetailsEl = value => {
    this.setState({ moreDetails: value });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.product !== this.props.match.params.product) {
      this.setState({
        isEditing: false
      });
      this.showProduct();
      this.fetchPhotos();
    }
  }
  showProduct = () => {
    const product = this.props.products.filter(
      p => p.subCat === this.props.match.params.product
    );

    this.setState({
      product: product[0],
      banner: product[0].banner[0],
      mainPhotos: product[0].mainPhotos,
      isLoading: false
    });
  };

  fetchPhotos = () => {
    this.setState({ LoadingGallery: true });
    fetch(`/api/gallery/${this.props.match.params.product}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const images = [];
        const photos = resData.photos;
        photos.map(photo => {
          return images.push({
            original: photo.source,
            thumbnail: photo.source
          });
        });
        return this.setState({ images });
      })
      .then(res => {
        this.setState({ LoadingGallery: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ LoadingGallery: false });
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
    const description = this.state.description;
    const keyFeatures = this.state.keyFeatures;
    const moreInfo = this.state.moreInfo;
    const subHeading = this.state.subHeading;
    const moreDetails = this.state.moreDetails;
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
    const token = this.context.token;
    fetch(`/api/products/${product.subCat}`, {
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
      //   .then(resData => alert(resData.toString() + "added to databe"))
      .catch(err => {
        console.log(err);
      });
    this.setState({ isEditing: false });
  };

  deleteProductHandler = () => {
    const id = this.state.product._id;
    fetch(`/api/products`, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res;
      })
      .then(res => this.setState({ deleted: true }))
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <ShowProduct
              product={this.state.product}
              LoadingGallery={this.state.LoadingGallery}
              photos={this.state.images}
              // photos={this.state.product[1]}
            />
          </div>
        )}
        {this.context.token && (
          <div>
            <button
              className="btn btn-sm btn-warning"
              onClick={this.editingProduct}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={this.deleteProductHandler}
            >
              Delete
            </button>
          </div>
        )}

        {this.state.isEditing && (
          <EditProduct
            product={this.state.product}
            photos={this.state.images}
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
        {this.state.deleted && <Redirect to="/" exact />}
      </div>
    );
  }
}

export default ProductsPage;
