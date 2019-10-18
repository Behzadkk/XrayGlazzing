import React, { Component } from "react";
import { Markup } from "interweave";
import ProductDetail from "../ProductDetail/ProductDetail";
import ProductGallery from "../ProductGallery/ProductGallery";
import ProductSidebar from "../ProductSidebar/ProductSidebar";
import Spinner from "../Spinner/Spinner";

import "./ShowProduct.css";

class ShowProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, images: [] };
  }

  render() {
    const bannerBackground = {
      backgroundImage: `url(${this.props.product.banner[0]})`
    };
    return (
      <div>
        <div className="">
          <div className="banner text-center" style={bannerBackground}>
            <h1 className="d-none"> {this.props.product.name}</h1>
          </div>
          <h1 className="text-center m-5"> {this.props.product.name}</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <ProductDetail product={this.props.product} />
              <div className="check">
                {this.props.LoadingGallery ? (
                  <Spinner />
                ) : (
                  <ProductGallery photos={this.props.photos} />
                )}
              </div>
              <div className="container mt-5">
                <Markup content={this.props.product.subHeading} />
              </div>
            </div>
            <div className="col-md-3 my-5">
              <aside className="sidebar">
                <h4 className="heading-primary">{this.props.product.name}</h4>
                <ProductSidebar
                  photos={this.props.photos}
                  product={this.props.product}
                />
                <div className="container mt-5">
                  <Markup content={this.props.product.moreInfo} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowProduct;
