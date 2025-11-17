import React, { useState } from "react";
import "./App.css";

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

  for (const [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={"square" + (isWinning ? " square-winning" : "")}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, onPlay, xIsNext }) {
  const { winner, line } = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const status = winner
    ? `Winner: ${winner}`
    : squares.every((sq) => sq !== null)
    ? "Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {[0, 1, 2].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onClick={() => handleClick(i)}
            isWinning={line.includes(i)}
          />
        ))}
      </div>
      <div className="board-row">
        {[3, 4, 5].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onClick={() => handleClick(i)}
            isWinning={line.includes(i)}
          />
        ))}
      </div>
      <div className="board-row">
        {[6, 7, 8].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onClick={() => handleClick(i)}
            isWinning={line.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}

function Game({ title }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((_, move) => {
    const desc = move === 0 ? "Go to game start" : `Go to move #${move}`;
    return (
      <li key={move}>
        <button
          className={
            "history-button" +
            (move === currentMove ? " history-current" : "")
          }
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className="game-page">
      <header className="header">
        <h1>{title}</h1>
        <p className="subtitle">
          Hosted via Azure Static Web Apps + GitHub Actions
        </p>
      </header>
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquares}
            onPlay={handlePlay}
            xIsNext={xIsNext}
          />
          <button className="reset-button" onClick={resetGame}>
            Reset game
          </button>
        </div>
        <div className="game-info">
          <h2>Move history</h2>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <Game title="Lewis-Tac-Azure" />;
}
