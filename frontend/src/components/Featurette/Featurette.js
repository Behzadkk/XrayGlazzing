import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import "./Featurette.css";

const Featurette = () => (
  <div className="container marketing">
    <hr className="featurette-divider" />
    <AboutUs />
    <hr className="featurette-divider" />
  </div>
);

export default Featurette;
