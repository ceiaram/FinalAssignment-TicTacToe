import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

//Remember what square got clicked to be filled with value of 'X' or 'O'
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Takes three parameters to update board accordingly
function Board({ xIsNext, squares, onPlay }) {
  // Update the corresponding squares array with the board's state
  function handleClick(i) {
    //If square is already filled OR there is a winner, return to avoid overwritting square
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    // Based on turn, square will be filled with either 'X' or 'O'
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    //Single call to update board
    onPlay(nextSquares);
  }

  // Let the player know that the game is over and who is the winner
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="container">
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
      </div>
    </>
  );

  //Show when the game is won and there are no more turns to make
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
}

// Display a list of past moves
export default function Game() {
  // Added state comppnent to know which player is next and keep the history of moves
  // Know state of each square to check for winner
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // Keep track of which step the user is currently viewing
  const [currentMove, setCurrentMove] = useState(0);

  // 'X' or 'O' is marked based on the turn
  const xIsNext = currentMove % 2 === 0;

  // Render the squares for the current move
  const currentSquares = history[currentMove];

  // Update the Game's state to re-render
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  //'Jump' to selected move in list and update current move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Display list of moves and make it interactable
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      //If reload the rendered game, React’s “key” error should disappear
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* Update the game by calling 'Board' component */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
