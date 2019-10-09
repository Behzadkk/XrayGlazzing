import React from "react";
import { Link } from "react-router-dom";

const PhotoGallery = props => {
  return (
    <div className="card-group">
      {props.products.map((product, i) => (
        <div key={i} className="col-sm-6 col-xl-4  px-0 mb-4 d-flex">
          <div className="card mr-2">
            <img
              className="card-img-top height-inherit"
              src={product.mainPhotos[0]}
              alt={product.subCat}
            />
            <div className="card-body text-center">
              <Link to={`/photos/${product.subCat}`}>
                <h5 className="card-title d-inline">
                  {captialize(product.subCat)}
                </h5>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;

function captialize(words) {
  return words
    .split("_")
    .map(w => w.substring(0, 1).toUpperCase() + w.substring(1))
    .join(" ");
}
