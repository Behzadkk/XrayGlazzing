import React, { Component } from "react";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

class GalleryImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      image: [],
      imageList: null
    };

    this.onPick = this.onPick.bind(this);
  }
  componentDidMount() {
    this.fetchGallery();
  }
  fetchGallery = () => {
    this.setState({ isLoading: true });
    let endPoint = "";
    if (this.props.product) {
      endPoint = this.props.product.subCat;
    }
    fetch("http://localhost:5000/api/gallery/" + endPoint)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ imageList: resData.photos, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  onPick(image) {
    this.setState(prevState => {
      const selections = prevState.image;
      // if (selections.length > 2) {
      //   selections.shift();
      // }
      selections.push(image);
      return { image: selections };
    });
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <ImagePicker
            images={this.state.imageList.map((image, i) => ({
              imageId: image._id,
              src: image.source,
              value: i
            }))}
            onPick={this.onPick}
          />
        )}
        <button
          className="btn btn-lg btn-success btn-block"
          type="button"
          onClick={() => this.props.selectedImages(this.state.image)}
        >
          Define Main photos for this group
        </button>
      </div>
    );
  }
}

export default GalleryImagePicker;
