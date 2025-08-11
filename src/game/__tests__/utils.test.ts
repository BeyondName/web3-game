import { describe, it, expect, vi } from 'vitest';
import { calcWinner, bestMove, isMoveAllowed, Board } from '../utils';

describe('calcWinner', () => {
  it('identifies winning lines', () => {
    const board: Board = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(calcWinner(board)).toBe('X');
  });

  it('returns null when no winner', () => {
    const board: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(calcWinner(board)).toBeNull();
  });
});

describe('isMoveAllowed', () => {
  it('allows move on empty square and correct turn', () => {
    const board: Board = Array(9).fill(null);
    expect(isMoveAllowed(board, 0, 'X')).toBe(true);
    expect(isMoveAllowed(board, 0, 'O')).toBe(false);
  });

  it('disallows move on non-empty square or wrong turn', () => {
    const board: Board = ['X', 'O', 'X', null, null, null, null, null, null];
    // It's O's turn and index 3 is empty
    expect(isMoveAllowed(board, 3, 'X')).toBe(false);
    expect(isMoveAllowed(board, 0, 'O')).toBe(false);
  });
});

describe('bestMove', () => {
  it('finds winning move when available', () => {
    const board: Board = ['X', 'X', null, 'O', 'O', null, null, null, null];
    expect(bestMove(board, 'X')).toBe(2);
  });

  it('blocks opponent winning move', () => {
    const board: Board = ['O', 'O', null, 'X', null, 'X', null, null, null];
    expect(bestMove(board, 'X')).toBe(2);
  });

  it('uses random tie breaker among best moves', () => {
    const board: Board = [null, null, null, null, 'O', null, null, null, null];
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0.99);
    expect(bestMove(board, 'X')).toBe(8);
    spy.mockReturnValue(0);
    expect(bestMove(board, 'X')).toBe(0);
    spy.mockRestore();
  });
});
