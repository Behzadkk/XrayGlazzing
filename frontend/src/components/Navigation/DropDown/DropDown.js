import React from "react";
import { NavLink } from "react-router-dom";

const DropDown = props => {
  const navItems = props.products.map((product, i) => {
    return (
      <NavLink
        key={i}
        to={"/products/" + product.link}
        className="dropdown-item"
        onClick={props.onSelect.bind(this, product.link)}
      >
        {product.name}
      </NavLink>
    );
  });
  return (
    <li className="nav-item dropdown">
      <NavLink
        className="nav-link dropdown-toggle"
        to=""
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.name}
      </NavLink>
      <div className="dropdown-menu dropdown-content m-0 p-0">{navItems}</div>
    </li>
  );
};

export default DropDown;
