import React from "react";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";

const GalleryPage = props => {
  window.scrollTo(0, 0);
  return (
    <div className="container">
      <h1 className="display-3 text-center m-5">Gallery</h1>
      <PhotoGallery products={props.products} />
    </div>
  );
};

export default GalleryPage;
