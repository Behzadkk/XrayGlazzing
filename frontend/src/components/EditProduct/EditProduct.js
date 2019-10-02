import React from "react";
import GalleryImagePicker from "../GalleryImagePicker/GalleryImagePicker";

const EditProduct = props => (
  <div className="row justify-content-center my-5">
    <div className="col-md-12 text-center">
      <h1 className="h3 mb-3 font-weight-normal">
        Edit {props.product.subCat}
      </h1>
    </div>
    <div className="col-md-12">
      <form>
        <div className="form-group row justify-content-between">
          <label className="my-2 mx-3" htmlFor="name">
            Name
          </label>
          <div className="col-sm-9">
            <input
              readOnly={true}
              className="form-control"
              type="text"
              id="name"
              ref={props.subCatInput}
              value={props.product.subCat}
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
              ref={props.groupInput}
              defaultValue={props.product.group}
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
              defaultValue={props.product.description}
              ref={props.descInput}
            ></textarea>
          </div>
        </div>

        <div className="form-group row justify-content-between">
          <p className="my-2 mx-3">Select Main Phtos</p>
          <div className="col-sm-9">
            <GalleryImagePicker
              selectedImages={props.selectedImages}
              product={props.product}
            />
          </div>
        </div>

        <div className="form-group row justify-content-end mt-5 mt-sm-0">
          <div className="col-sm-9">
            <button
              onClick={props.onConfirm}
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

export default EditProduct;
