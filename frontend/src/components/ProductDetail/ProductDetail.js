import React from "react";

const ProductDetail = props => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="my-5">
          {props.product.mainPhotos.length > 1 && (
            <img
              className="img-thumbnail float-left m-3 detail-photo"
              src={props.product.mainPhotos[0]}
              alt={props.product.subCat}
            />
          )}
          <p className="">{props.product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
