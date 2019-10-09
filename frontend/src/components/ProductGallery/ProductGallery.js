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
      return images.push({ original: photo.source, thumbnail: photo.source });
    });
    return this.setState({ images });
  };
  render() {
    return (
      <div>
        {this.state.images.length > 0 && (
          <ImageGallery items={this.state.images} />
        )}
      </div>
    );
  }
}

export default ProductGallery;
