import React from 'react';

interface SquareProps {
  value: string | null;
  index: number;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, index, onClick }) => {
  const position = index + 1;
  return (
    <button
      className="flex items-center justify-center text-xl font-bold border w-full aspect-square"
      onClick={onClick}
      aria-label={`square ${position} ${value ? value : 'empty'}`}
    >
      {value}
    </button>
  );
};

export default Square;
