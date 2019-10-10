import React from "react";

const Options = props => (
  <option value={props.category._id}>{props.category.name}</option>
);

export default Options;
