import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  //Remember what tile got clicked to be filled with 'X'
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // 'X' or 'O' is marked based on the turn
  const [xIsNext, setXIsNext] = useState(true);

  // Know state of each square to check for winner
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Update the corresponding squares array with the board's state
  function handleClick(i) {
    //If square is already filled, return to avoid overwritting square
    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    // Based on turn, square will be filled with either 'X' or 'O'
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="board-row">
        {/* Only call 'handleClick when user presses square */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
