import React from "react";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

const ProductSidebar = props => (
  <ul className="nav flex-column">
    {props.photos ? (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to={`/photos/${props.product}`}>
          <div>
            <img
              className="img-thumbnail side-image mx-3"
              src={props.photos[0].source}
              alt={props.product}
            />
            Gallery
          </div>
        </Link>
      </li>
    ) : (
      <Link to="/gallery">Gallery </Link>
    )}

    {props.photos ? (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to={`/projects/${props.product}`}>
          <div>
            <img
              className="img-thumbnail side-image mx-3"
              src={props.photos[0].source}
              alt="gallery"
            />
            Related Projects
          </div>
        </Link>
      </li>
    ) : (
      <Spinner />
    )}
    {props.photos ? (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to="/drawings">
          <div>
            <img
              className="img-thumbnail side-image mx-3"
              src={props.photos[0].source}
              alt="gallery"
            />
            Related Drawings
          </div>
        </Link>
      </li>
    ) : (
      <Spinner />
    )}
  </ul>
);

export default ProductSidebar;
