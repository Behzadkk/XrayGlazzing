import React from "react";

const ShowProduct = props => {
  return (
    <div>
      <h1 className="display-4 text-center m-4">
        {captialize(props.product.subCat)}
      </h1>
      {props.product.mainPhotos.length > 0 && (
        <div>
          <img src={props.product.mainPhotos[0]} alt={props.product.subCat} />
        </div>
      )}
      <div>
        <p>{props.product.description}</p>
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
