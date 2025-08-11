export type Player = 'X' | 'O';
export type Square = Player | null;
export type Board = Square[];

/**
 * Determine the winner of a tic-tac-toe board.
 * @param board Current board state as a flat array of 9 squares.
 * @returns The winning player or null when there's no winner.
 */
export const calcWinner = (board: Board): Player | null => {
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
    const value = board[a];
    if (value && value === board[b] && value === board[c]) {
      return value;
    }
  }
  return null;
};

const getAvailableMoves = (board: Board): number[] =>
  board.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);

const minimax = (board: Board, current: Player, maximizing: Player): number => {
  const winner = calcWinner(board);
  if (winner === maximizing) return 1;
  if (winner && winner !== maximizing) return -1;

  const moves = getAvailableMoves(board);
  if (moves.length === 0) return 0;

  const opponent: Player = current === 'X' ? 'O' : 'X';

  const scores = moves.map((idx) => {
    board[idx] = current;
    const score = minimax(board, opponent, maximizing);
    board[idx] = null;
    return score;
  });

  return current === maximizing ? Math.max(...scores) : Math.min(...scores);
};

/**
 * Determine the best move for a player using minimax. In case of ties, a random
 * move among the best scores is chosen.
 */
export const bestMove = (board: Board, player: Player): number => {
  const opponent: Player = player === 'X' ? 'O' : 'X';
  const moves = getAvailableMoves(board);

  const scored = moves.map((idx) => {
    board[idx] = player;
    const score = minimax(board, opponent, player);
    board[idx] = null;
    return { idx, score };
  });

  const bestScore = Math.max(...scored.map((s) => s.score));
  const best = scored.filter((s) => s.score === bestScore).map((s) => s.idx);
  const choice = Math.floor(Math.random() * best.length);
  return best[choice];
};

/**
 * Check if a move is allowed: the square must be empty and it must be the
 * player's turn.
 */
export const isMoveAllowed = (
  board: Board,
  index: number,
  player: Player,
): boolean => {
  if (board[index] !== null) return false;
  const xCount = board.filter((s) => s === 'X').length;
  const oCount = board.filter((s) => s === 'O').length;
  const currentTurn: Player = xCount === oCount ? 'X' : 'O';
  return player === currentTurn;
};

export default { calcWinner, bestMove, isMoveAllowed };
