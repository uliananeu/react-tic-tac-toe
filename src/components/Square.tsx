import React from "react";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = (props) => {
  return (
    <button
      className={props.value ? "btn disabled" : "btn"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
