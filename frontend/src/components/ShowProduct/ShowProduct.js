import React from "react";

import ProductDetail from "../ProductDetail/ProductDetail";
import ProductGallery from "../ProductGallery/ProductGallery";
import ProductSidebar from "../ProductSidebar/ProductSidebar";
import "./ShowProduct.css";

const ShowProduct = props => {
  const bannerBackground = {
    backgroundImage: `url(${props.product.banner[0]})`
  };
  return (
    <div>
      <div className="">
        <div className="banner text-center" style={bannerBackground}>
          <h1 className="d-none"> {props.product.name}</h1>
        </div>
        <h1 className="text-center m-5"> {props.product.name.toUpperCase()}</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <ProductDetail product={props.product} />
            <div className="check">
              <ProductGallery photos={props.photos.photos} />
            </div>
            <div>
              <h3>{props.product.subHeading}</h3>
            </div>
          </div>
          <div className="col-md-3 my-5">
            <aside className="sidebar">
              <h4 className="heading-primary">{props.product.name}</h4>
              <ProductSidebar
                photos={props.photos.photos}
                product={props.product}
              />
            </aside>
            <div className="mt-4">{props.product.moreInfo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
