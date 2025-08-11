import React, { useState } from 'react';
import Square from './Square';

type Player = 'X' | 'O';

interface GameState {
  squares: (Player | null)[];
  turn: Player;
  winner: Player | null;
}

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (squares: (Player | null)[]): Player | null => {
  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Board: React.FC<{ player?: Player }> = ({ player = 'X' }) => {
  const [game, setGame] = useState<GameState>({
    squares: Array(9).fill(null),
    turn: 'X',
    winner: null,
  });

  const handleClick = (i: number) => {
    if (game.squares[i] || game.winner || game.turn !== player) return;
    const nextSquares = game.squares.slice();
    nextSquares[i] = game.turn;
    const winner = calculateWinner(nextSquares);
    setGame({
      squares: nextSquares,
      turn: game.turn === 'X' ? 'O' : 'X',
      winner,
    });
  };

  const boardDisabled = game.turn !== player || !!game.winner;

  return (
    <div className={`grid grid-cols-3 gap-2 w-full max-w-xs ${boardDisabled ? 'pointer-events-none' : ''}`}>
      {game.squares.map((value, idx) => (
        <Square key={idx} value={value} index={idx} onClick={() => handleClick(idx)} />
      ))}
    </div>
  );
};

export default Board;
