import React, { useReducer } from "react";
import Board from "./Board";

interface HistoryItem {
  squares: Array<string | null>;
}

interface GameState {
  xIsNext: boolean;
  history: Array<HistoryItem>;
}

interface JumpAction {
  type: "JUMP";
  payload: {
    step: number;
  };
}

interface MoveAction {
  type: "MOVE";
  payload: {
    squares: (string | null)[];
  };
}

type GameAction = JumpAction | MoveAction;

const reducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "JUMP":
      return {
        ...state,
        xIsNext: action.payload?.step % 2 === 0 || true,
        history: state.history.slice(0, action.payload?.step! + 1),
      };
    case "MOVE":
      return {
        ...state,
        history: state.history.concat({
          squares: action.payload?.squares || [],
        }),
        xIsNext: !state.xIsNext,
      };
    default:
      return state;
  }
};

const Game: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  });

  const { xIsNext, history } = state;

  const jumpTo = (step: number) => {
    dispatch({ type: "JUMP", payload: { step } });
  };

  const handleClick = (i: number) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    dispatch({ type: "MOVE", payload: { squares } });
  };

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);

  const status =
    winner && winner !== "D"
      ? `Winner is ${winner}`
      : winner === "D"
      ? "Draw"
      : `Next player is ${xIsNext ? "X" : "O"}`;

  const moves = history.map((step, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move ? `Go to #${move}` : "Start the Game"}
      </button>
    </li>
  ));

  return (
    <div className={winner ? "game disabled" : "game"}>
      <div className="game-board">
        <Board onClick={(i) => handleClick(i)} squares={current.squares} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ul>{moves}</ul>
      </div>
    </div>
  );
};

const calculateWinner = (squares: Array<string | null>): string | null => {
  const winnerLines: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let isDraw = true;

  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[b] === squares[c] &&
      squares[c]
    ) {
      return squares[a] as string;
    }
    if (!squares[a] || !squares[b] || !squares[c]) {
      isDraw = false;
    }
  }

  if (isDraw) return "D";
  return null;
};

export default Game;
