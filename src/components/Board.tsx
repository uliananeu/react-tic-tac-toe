import React from "react";
import Square from "./Square";

interface BoardProps {
  squares: (string | null)[];
  onClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = (props) => {
  return (
    <div className="board">
      <div>
        {[0, 1, 2].map((index) => (
          <Square
            key={index}
            value={props.squares[index]}
            onClick={() => props.onClick(index)}
          />
        ))}
      </div>
      <div>
        {[3, 4, 5].map((index) => (
          <Square
            key={index}
            value={props.squares[index]}
            onClick={() => props.onClick(index)}
          />
        ))}
      </div>
      <div>
        {[6, 7, 8].map((index) => (
          <Square
            key={index}
            value={props.squares[index]}
            onClick={() => props.onClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
