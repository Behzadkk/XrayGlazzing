import React, { Component } from "react";
import Notifications, { notify } from "react-notify-toast";
import Spinner from "./Spinner";
import Images from "./Images";
import Buttons from "./Button";

// import "./Uploader.css";

const toastColor = {
  background: "#505050",
  text: "#fff"
};

export default class Uploader extends Component {
  state = {
    loading: true,
    uploading: false,
    images: []
  };

  componentDidMount() {
    // fetch(`http://localhost:5000/wake-up`).then(res => {
    //   if (res.ok) {
    return this.setState({ loading: false });
    //   }
    //   const msg = "Something is went wrong with Heroku";
    //   this.toast(msg, "custom", 2000, toastColor);
    // });
  }

  toast = notify.createShowQueue();

  onChange = e => {
    const errs = [];
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      return this.toast(msg, "custom", 2000, toastColor);
    }

    const formData = new FormData();
    const types = ["image/png", "image/jpeg", "image/gif"];

    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }

      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
      }

      formData.append(i, file);
    });

    if (errs.length) {
      return errs.forEach(err => this.toast(err, "custom", 2000, toastColor));
    }

    this.setState({ uploading: true });

    fetch(`http://localhost:5000/image-upload`, {
      method: "POST",
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(resData => console.log(resData))
      .then(images => {
        this.setState({
          uploading: false,
          images
        });
      })
      .catch(err => {
        // err.json().then(e => {
        //   this.toast(e.message, "custom", 2000, toastColor);
        //   this.setState({ uploading: false });
        // });
        console.log(err);
      });
  };

  filter = id => {
    return this.state.images.filter(image => image.public_id !== id);
  };

  removeImage = id => {
    this.setState({ images: this.filter(id) });
  };

  onError = id => {
    this.toast("Oops, something went wrong", "custom", 2000, toastColor);
    this.setState({ images: this.filter(id) });
  };

  render() {
    const { loading, uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case loading:
          return (
            <div className={"loading-wrapper fadein"}>
              <h4>Heroku is spinning up, one moment please...</h4>
              <div className={"loading"}>
                <div className={"background"}>
                  <i className="icon-heroku"></i>
                </div>
                <div className={"spinner"} />
              </div>
            </div>
          );
        case uploading:
          return <Spinner />;
        case images.length > 0:
          return (
            <Images
              images={this.state.images}
              removeImage={this.removeImage}
              onError={this.onError}
            />
          );
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };

    return (
      <div className="container">
        <Notifications />
        <div className="buttons">{content()}</div>
        {/* <Footer /> */}
      </div>
    );
  }
}
