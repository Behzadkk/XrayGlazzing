import React from "react";
import "./image-gallery.css";
import "./image-gallery-no-icon.css";

import ImageGallery from "react-image-gallery";

class ProductGallery extends React.Component {
  state = { images: [] };

  componentDidMount() {
    if (this.props.photos) {
      this.findPhotos();
    }
  }
  findPhotos = () => {
    const images = [];
    this.props.photos.map(photo => {
      images.push({ original: photo.source, thumbnail: photo.source });
    });
    this.setState({ images });
  };
  render() {
    return <ImageGallery items={this.state.images} />;
  }
}

export default ProductGallery;
