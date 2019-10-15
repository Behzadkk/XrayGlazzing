import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import "./MainNav.css";
import DropDown from "./DropDown/DropDown";

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <nav className="navbar navbar-expand-lg bg-black">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src="/xray-logo.jpg" alt="xray-glazing" className="brand" />
            </Link>
            <button
              className="navbar-toggler navbar-dark"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample05"
              aria-controls="navbarsExample05"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample05">
              <ul className="navbar-nav mr-auto">
                <DropDown
                  products={props.navbarData.Rooflights}
                  name="Rooflights"
                />
                <DropDown products={props.navbarData.Windows} name="Windows" />
                <DropDown products={props.navbarData.Doors} name="Doors" />
                <DropDown
                  products={props.navbarData.Other}
                  name="Other Products"
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
                    About Us
                  </Link>
                </li>
                {context.token && (
                  <li className="nav-item border">
                    <Link className="nav-link" to="/admin">
                      ADMIN PAGE
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;
