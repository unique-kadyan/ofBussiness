import React from "react";
import getColorForBackground from "../helpers/ColorHelpers";
import "./Label.css";

function Label(props) {
  const onLabelSelected = label => {
    props.onLabelSelected(label);
  };
  return (
    <a
      href="#"
      type="button"
      className="label-wrapper"
      onClick={() => onLabelSelected(props.name)}
      style={{ background: `#${props.color}` }}
    >
      <span style={{ color: getColorForBackground(props.color) }}>
        {props.name}
      </span>
    </a>
  );
}

export default Label;
