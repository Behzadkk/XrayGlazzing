import React from "react";
import { Link } from "react-router-dom";

const ProductSidebar = props => (
  <ul className="nav flex-column">
    {props.photos[0] ? (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to={`/photos/${props.product.subCat}`}>
          <div>
            <img
              className="img-thumbnail side-image mr-2"
              src={props.photos[0].source}
              alt={props.product.subCat}
            />
            {props.product.name}'s Gallery
          </div>
        </Link>
      </li>
    ) : (
      <Link to="/gallery">Gallery </Link>
    )}

    {props.photos[0] ? (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to={`/${props.product.subCat}/projects`}>
          <div>
            <img
              className="img-thumbnail side-image mr-2"
              src={props.photos[0].source}
              alt="gallery"
            />
            {props.product.name}'s Projects
          </div>
        </Link>
      </li>
    ) : (
      <Link to="/projects">Projects </Link>
    )}
    {props.photos[0] ? (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to="/drawings">
          <div>
            <img
              className="img-thumbnail side-image mr-2"
              src={props.photos[0].source}
              alt="gallery"
            />
            {props.product.name}'s Drawings
          </div>
        </Link>
      </li>
    ) : (
      <Link to="/drawings">Drawings </Link>
    )}
  </ul>
);

export default ProductSidebar;
