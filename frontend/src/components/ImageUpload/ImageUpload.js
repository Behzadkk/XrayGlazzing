import React from "react";
import "./ImageUpload.css";

// import { sendFile } from "../../helpers/fileUploader";
import CategorySelector from "../CategorySelector/CategorySelector";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.catEl = React.createRef();
    this.state = { file: {}, imagePreviewUrl: "", savedFile: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();

    const category = this.catEl.current.value;
    const source = this.state.savedFile;

    const photo = { category, source };
    const requestBody = { ...photo };
    console.log(requestBody);
    fetch("http://localhost:5000/api/gallery", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => this.setState({ imagePreviewUrl: null }))
      .catch(err => {
        console.log(err);
      });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    const formData = new FormData();
    formData.append("myFile", file);
    fetch(`http://localhost:5000/image-upload`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res => this.setState({ savedFile: res }));

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
        <form onSubmit={e => this._handleSubmit(e)}>
          <CategorySelector categoryInput={this.catEl} />
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
                onClick={e => this._handleSubmit(e)}
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Append Photo
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ImageUpload;
