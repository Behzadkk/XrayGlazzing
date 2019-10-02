import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default props =>
  props.images.map((image, i) => (
    <div key={i} className="fadein">
      <div onClick={() => props.removeImage(image.source)} className="delete">
        <FontAwesomeIcon icon={faTimesCircle} size="2x" />
      </div>
      <img
        src={image.source}
        alt=""
        onError={() => props.onError(image.public_id)}
      />
    </div>
  ));
