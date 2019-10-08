import React from "react";
import "./Carousel.css";

const Carousel = props => {
  console.log(props.photos);
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        {props.photos.map((photo, i) => (
          <div
            key={i}
            className={i === 1 ? "carousel-item active" : "carousel-item"}
          >
            <img className="d-block w-100" src={photo.source} alt="" />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};
export default Carousel;
