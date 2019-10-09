import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import "./Featurette.css";
import Info from "./Info/Info";
import PhotoGallery from "../PhotoGallery/PhotoGallery";
import ProjVideos from "./ProjVideos/ProjVideos";

const Featurette = props => (
  <div className="container marketing mt-5">
    <hr className="featurette-divider" />
    <Info />
    <hr className="featurette-divider" />
    <AboutUs />
    <hr className="featurette-divider" />
    <h2 className="featurette-heading text-center my-5">Our Products</h2>
    <PhotoGallery products={props.products} />
    <hr className="featurette-divider" />
    <ProjVideos />
  </div>
);

export default Featurette;
