import React from "react";
import { HashRouter, NavLink } from "react-router-dom";

import "./MainNav.css";
import DropDown from "./DropDown/DropDown";

const MainNavigation = props => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand" href="#">
        XRAY
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <HashRouter>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <DropDown
              products={props.navbarData.Rooflights}
              name="Rooflights"
            />{" "}
            <DropDown products={props.navbarData.Windows} name="Windows" />
            <DropDown products={props.navbarData.Doors} name="Doors" />
            <DropDown products={props.navbarData.Other} name="Other Products" />
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                Drawings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </HashRouter>
    </div>
  </nav>
);

export default MainNavigation;
