import React, { Component } from "react";
// import GalleryImagePicker from "../GalleryImagePicker/GalleryImagePicker";

class NewProduct extends Component {
  state = { selectingPhotos: false };
  showGalleryHandler = () => {
    this.setState(prevState => {
      return { selectingPhotos: !prevState.selectingPhotos };
    });
  };
  render() {
    return (
      <div className="row justify-content-center my-5">
        <div className="col-md-12 text-center">
          <h1 className="h3 mb-3 font-weight-normal">Create a New Product</h1>
        </div>
        <div className="col-md-12">
          <form>
            <div className="form-group row justify-content-between">
              <label className="my-2 mx-3" htmlFor="name">
                Name
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  placeholder="Fixed Rooflight"
                  ref={this.props.subCatInput}
                />
              </div>
            </div>
            <div className="form-group row justify-content-between">
              <label className="my-2 mx-3" htmlFor="categorey">
                Categorey
              </label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  id="categorey"
                  ref={this.props.groupInput}
                >
                  <option value="rooflights">Rooflights</option>
                  <option value="windows">Windows</option>
                  <option value="doors">Doors</option>
                  <option value="other">Other Products</option>
                </select>
              </div>
            </div>
            <div className="form-group row justify-content-between">
              <label className="my-2 mx-3" htmlFor="description">
                Description
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  id="description"
                  placeholder="Excepteur nostrud ipsum reprehenderit eu cillum aliquip mollit voluptate aute esse sint culpa magna ipsum."
                  ref={this.props.descInput}
                />
              </div>
            </div>

            {/* <p onClick={this.showGalleryHandler}>Select Phtos</p>
            {this.state.selectingPhotos && (
              <GalleryImagePicker selectedImages={this.props.selectedImages} />
            )} */}

            <div className="form-group row justify-content-end mt-5 mt-sm-0">
              <div className="col-sm-9">
                <button
                  onClick={this.props.onConfirm}
                  className="btn btn-lg btn-primary btn-block"
                >
                  Submit!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewProduct;
