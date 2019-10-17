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
            <p className="d-inline small">{props.product.name}'s Gallery</p>
          </div>
        </Link>
      </li>
    ) : (
      <Link to="/gallery">Gallery </Link>
    )}

    {props.product.projects[0] ? (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to={`/${props.product.subCat}/projects`}>
          <div>
            <img
              className="img-thumbnail side-image mr-2"
              src={props.photos[0] ? props.photos[0].source : ""}
              alt="gallery"
            />
            <p className="d-inline small">{props.product.name}'s Projects</p>
          </div>
        </Link>
      </li>
    ) : (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to="/projects">
          <div>
            <img
              className="img-thumbnail side-image mr-2"
              src={props.photos[0] ? props.photos[0].source : ""}
              alt="gallery"
            />
            <p className="d-inline small">Recent Projects</p>
          </div>
        </Link>
      </li>
    )}

    <li className="nav-item d-flex border-bottom py-3">
      <Link to="/drawings">
        <div>
          <img
            className="img-thumbnail side-image mr-2"
            src={props.photos[0] ? props.photos[0].source : ""}
            alt="gallery"
          />
          {props.product.drawings[0] ? (
            <p className="d-inline small">{props.product.name}'s Drawings</p>
          ) : (
            <p className="d-inline small">All Drawings</p>
          )}
        </div>
      </Link>
    </li>
  </ul>
);

export default ProductSidebar;
