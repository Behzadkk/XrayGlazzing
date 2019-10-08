import React from "react";

import ProductDetail from "../ProductDetail/ProductDetail";
import ProductGallery from "../ProductGallery/ProductGallery";
import ProductSidebar from "../ProductSidebar/ProductSidebar";

const ShowProduct = props => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        {props.product.mainPhotos.length > 0 && (
          <img
            className="img-fluid my-banner"
            src={props.product.mainPhotos[0]}
            alt={props.product.subCat}
          />
        )}
        <div className="container">
          <h1 className="display-4"> {captialize(props.product.subCat)}</h1>
          <p className="lead">Supplied by XRAY GLAZING</p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <ProductDetail product={props.product} />
            <div className="check">
              <ProductGallery photos={props.photos.photos} />
            </div>
          </div>
          <div className="col-md-3 my-5">
            <aside className="sidebar">
              <h4 className="heading-primary">
                {captialize(props.product.subCat)}
              </h4>
              <ProductSidebar
                photos={props.photos.photos}
                product={props.product.subCat}
              />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;

function captialize(words) {
  return words
    .split("_")
    .map(w => w.substring(0, 1).toUpperCase() + w.substring(1))
    .join(" ");
}
