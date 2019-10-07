import React, { Component } from "react";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";
import Spinner from "../components/Spinner/Spinner";

class GalleryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      images: []
    };
  }
  componentDidMount() {
    this.fetchGallery();
    this.showMainPhotos(this.props.products);
  }
  static getDrivedStateFromProps(props, state) {
    this.showMainPhotos(props.products);
  }

  showMainPhotos = products => {
    const images = products.map(p => p.mainPhotos[0]);
    this.setState({ images: images });
  };

  fetchGallery = () => {
    this.setState({ isLoading: true });
    fetch("http://localhost:5000/api/gallery")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.photos);
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <div className="container">
        <h1 className="display-3 text-center m-5">Gallery</h1>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <PhotoGallery products={this.props.products} />
        )}
      </div>
    );
  }
}

export default GalleryPage;
