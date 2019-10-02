import React from "react";
import CardDeck from "../CardsDeck/CardsDeck";

const ShowProduct = props => {
  return (
    <div>
      <h1 className="display-4 text-center m-4">
        {captialize(props.product.subCat)}
      </h1>
      {props.product.mainPhotos.length > 0 && (
        <div>
          <CardDeck images={props.product.mainPhotos} />
        </div>
      )}
      <div className="my-5">
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
