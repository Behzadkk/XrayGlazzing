import React from "react";
import "./ImageUpload.css";

import { sendFile } from "../../helpers/fileUploader";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: {}, imagePreviewUrl: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
    console.log(e.target.files);
    sendFile(this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    sendFile(file);

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} className="imgPreview" alt="" />
      );
    } else {
      $imagePreview = (
        <div className="previewText imgPreview">
          Please select an Image for Preview
        </div>
      );
    }

    return (
      <div className="previewComponent">
        <form>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="image">
              Image
            </label>
            <div className="col-sm-9">
              <input
                className="form-control-file"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={e => this._handleImageChange(e)}
                onSubmit={e => this._handleSubmit(e)}
                required
              />
            </div>
          </div>
          <div className="form-group row justify-content-end mt-5 mt-sm-0">
            <div className="col-sm-9">{$imagePreview}</div>
          </div>
          <div className="form-group row justify-content-end mt-5 mt-sm-0">
            <div className="col-sm-9">
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Upload Image
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ImageUpload;
