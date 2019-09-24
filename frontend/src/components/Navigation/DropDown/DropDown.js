import React from "react";
import { NavLink } from "react-router-dom";

const DropDown = props => {
  const navItems = props.products.map(product => {
    return (
      <NavLink to={product.link} className="dropdown-item">
        {product.name}
      </NavLink>
    );
  });
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.name}
      </a>
      <div className="dropdown-menu dropdown-content m-0 p-0">{navItems}</div>
    </li>
  );
};

export default DropDown;
