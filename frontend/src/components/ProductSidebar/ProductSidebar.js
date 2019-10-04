import React from "react";
import Carousel from "../Carousel/Carousel";
import Spinner from "../Spinner/Spinner";

const ProductSidebar = props => (
  <ul class="nav flex-column">
    <li></li>
    <li class="nav-item">
      Gallery
      {props.photos ? <Carousel photos={props.photos} /> : <Spinner />}
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        Project
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        drawing
      </a>
    </li>
  </ul>
);

export default ProductSidebar;
