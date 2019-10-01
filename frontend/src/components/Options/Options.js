import React from "react";

const Options = props => (
  <option value={props.product._id}>{props.product.subCat}</option>
);

export default Options;
