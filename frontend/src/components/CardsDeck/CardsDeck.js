import React from "react";

const CardDeck = props => {
  return (
    <div className="card-deck">
      {props.images.map((image, i) => (
        <div className="card">
          <img className="card-img-top" src={image} alt={image} />
        </div>
      ))}
    </div>
  );
};

export default CardDeck;
