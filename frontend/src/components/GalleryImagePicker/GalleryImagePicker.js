import React, { Component } from "react";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

class GalleryImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      image: null,
      imageList: null
    };

    this.onPick = this.onPick.bind(this);
  }
  componentDidMount() {
    this.fetchGalley();
  }
  fetchGalley = () => {
    this.setState({ isLoading: true });
    fetch("http://localhost:5000/api/gallery")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ imageList: resData.photos, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  onPick(image) {
    this.setState({ image });
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
          type="button"
          onClick={() => this.props.selectedImages(this.state.image)}
        >
          OK
        </button>
      </div>
    );
  }
}

export default GalleryImagePicker;
