import React, { Component } from "react";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

class GalleryImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: true,
      image: null
      // imageList: null
    };

    this.onPick = this.onPick.bind(this);
  }
  // componentDidMount() {
  //   this.fetchGallery();
  // }
  // fetchGallery = () => {
  //   this.setState({ isLoading: true });
  //   let endPoint = "";
  //   if (this.props.product) {
  //     endPoint = this.props.product.subCat;
  //   }
  //   fetch("/api/gallery/" + endPoint)
  //     .then(res => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         throw new Error("Failed!");
  //       }
  //       return res.json();
  //     })
  //     .then(resData => {
  //       console.log(resData);
  //       this.setState({ imageList: resData.photos, isLoading: false });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({ isLoading: false });
  //     });
  // };

  onPick(image) {
    // this.setState(prevState => {
    //   const selections = prevState.image;
    //   // if (selections.length > 2) {
    //   //   selections.shift();
    //   // }
    //   selections.push(image);
    //   return { image: selections };
    // });
    // console.log(this.state.image);
    this.setState({ image });
  }

  render() {
    return (
      <div>
        <ImagePicker
          images={this.props.photos.map((image, i) => ({
            imageId: image._id,
            src: image.source,
            value: i
          }))}
          onPick={this.onPick}
        />
        <button
          className="btn btn-lg btn-success btn-block my-2"
          type="button"
          onClick={() => this.props.selectedImages(this.state.image)}
        >
          Define Main the photo for this group
        </button>
      </div>
    );
  }
}

export default GalleryImagePicker;
