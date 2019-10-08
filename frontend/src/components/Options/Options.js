import React from "react";

const Options = props => (
  <option value={props.product._id}>{props.product.name}</option>
);

export default Options;
