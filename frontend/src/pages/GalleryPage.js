import React, { Component } from "react";

class GalleryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    this.fetchGallery();
  }

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
        // this.setState({ product: resData.products, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return <div>Gallery Page</div>;
  }
}

export default GalleryPage;
