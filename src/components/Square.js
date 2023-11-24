import React from "react";

export default function Squire(props) {
  return (
    <button
      className={props.value ? "btn disabled" : "btn"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
