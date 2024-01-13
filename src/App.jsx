import { useState } from "react";

function Squire({ value, onSquireClick }) {
  return (
    <button
      onClick={onSquireClick}
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg font-semibold"
    >
      {value}
    </button>
  );
}

function Board({ squire, onPlay, xIsNext }) {
  const winner = calculateWinner(squire);
  let status;
  if (winner) {
    status = "Winner:" + winner;
  } else {
    status = "Next player:" + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squire[i] || calculateWinner(squire)) {
      return;
    }
    const nextSquire = squire.slice();
    if (xIsNext) {
      nextSquire[i] = "X";
    } else {
      nextSquire[i] = "O";
    }
    onPlay(nextSquire);
  }
  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Squire value={squire[0]} onSquireClick={() => handleClick(0)} />
        <Squire value={squire[1]} onSquireClick={() => handleClick(1)} />
        <Squire value={squire[2]} onSquireClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Squire value={squire[3]} onSquireClick={() => handleClick(3)} />
        <Squire value={squire[4]} onSquireClick={() => handleClick(4)} />
        <Squire value={squire[5]} onSquireClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Squire value={squire[6]} onSquireClick={() => handleClick(6)} />
        <Squire value={squire[7]} onSquireClick={() => handleClick(7)} />
        <Squire value={squire[8]} onSquireClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquire = history[currentMove];

  function handlePlay(nextSquire) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquire];
    setHistory([...history, nextSquire]);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((squires, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the game`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div>
      <div>
        <Board
          squire={currentSquire}
          onPlay={handlePlay}
          // setSquire={setSquire}
          xIsNext={xIsNext}
          // setXIsNext={setXIsNext}
        />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// export default Board;
