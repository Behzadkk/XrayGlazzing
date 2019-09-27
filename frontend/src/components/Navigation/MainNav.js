import React from "react";
import { Link } from "react-router-dom";

import "./MainNav.css";
import DropDown from "./DropDown/DropDown";

const MainNavigation = props => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        XRAY
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <DropDown
            products={props.navbarData.Rooflights}
            name="Rooflights"
            onSelect={props.onSelection}
          />
          <DropDown
            products={props.navbarData.Windows}
            name="Windows"
            onSelect={props.onSelection}
          />
          <DropDown
            products={props.navbarData.Doors}
            name="Doors"
            onSelect={props.onSelection}
          />
          <DropDown
            products={props.navbarData.Other}
            name="Other Products"
            onSelect={props.onSelection}
          />
          <li className="nav-item">
            <Link className="nav-link" to="/gallery">
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/projects">
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/drawings">
              Drawings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default MainNavigation;
