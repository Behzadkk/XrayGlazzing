import React from "react";

import CategorySelector from "../CategorySelector/CategorySelector";

class NewDrawing extends React.Component {
  constructor(props) {
    super(props);
    this.catEl = React.createRef();
    this.state = {
      fileURL: ""
    };
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleUploadFile(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    // data.append("filename", this.fileName.value);
    console.log(this.uploadInput.files);
    fetch("/upload/drawings", {
      method: "POST",
      body: data
    }).then(response => {
      console.log(response);
      response.json().then(body => {
        this.setState({ fileURL: `/${body.file}` });
      });
    });
  }

  _handleSubmit(e) {
    e.preventDefault();

    const category = this.catEl.current.value;
    const source = this.state.fileURL;

    const requestBody = { category, source };
    fetch("/api/drawings", {
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
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="previewComponent">
        <div>hi</div>
        {/* <form onSubmit={e => this._handleSubmit(e)}>
          <div className="col-md-12 text-center">
            <h1 className="h3 mb-3 font-weight-normal">Upload a new drawing</h1>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="drawing">
              Select Drawing
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="file"
                id="drawing"
                onChange={this.handleUploadFile}
                ref={ref => {
                  this.uploadInput = ref;
                }}
              />
            </div>
            <input type="file" />
          </div>
          <CategorySelector categoryInput={this.catEl} />
          <div className="form-group row justify-content-end mt-5 mt-sm-0">
            <div className="col-sm-9">
              <button
                onClick={e => this._handleSubmit(e)}
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Upload Drawing
              </button>
            </div>
          </div>
        </form> */}
      </div>
    );
  }
}

export default NewDrawing;
