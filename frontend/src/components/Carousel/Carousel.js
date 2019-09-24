import React from "react";
import "./Carousel.css";

const Carousel = () => (
  <div
    id="carouselExampleControls"
    className="carousel slide"
    data-ride="carousel"
  >
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_960_720.jpg"
          alt="First slide"
        />
      </div>
      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2015/05/15/14/21/architecture-768432_960_720.jpg"
          alt="Second slide"
        />
      </div>
      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2013/04/11/19/46/louvre-102840_960_720.jpg"
          alt="Third slide"
        />
      </div>
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

export default Carousel;
