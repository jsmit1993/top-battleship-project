import { Gameboard } from './gameboard.js';
import { Ships } from './ships.js';

describe('Gameboard', () => {
  let board;
  let carrier;
  let destroyer;

  beforeEach(() => {
    board = new Gameboard();
    carrier = new Ships(5);
    destroyer = new Ships(2);
  });

  describe('placeShip', () => {
    test('places a ship horizontally at valid coordinates', () => {
      expect(board.placeShip(destroyer, [0, 0], 'horizontal')).toBe(true);
      expect(board.board[0][0]).toBe(destroyer);
      expect(board.board[0][1]).toBe(destroyer);
      expect(board.board[0][2]).toBeNull();
    });

    test('places a ship vertically at valid coordinates', () => {
      expect(board.placeShip(destroyer, [2, 3], 'vertical')).toBe(true);
      expect(board.board[2][3]).toBe(destroyer);
      expect(board.board[3][3]).toBe(destroyer);
      expect(board.board[4][3]).toBeNull();
    });

    test('rejects ship placement that goes out of horizontal bounds', () => {
      // A length-5 ship starting at column 7 would reach column 11 (out of 0-9 bounds)
      expect(board.placeShip(carrier, [0, 7], 'horizontal')).toBe(false);
      expect(board.board[0][7]).toBeNull();
    });

    test('rejects ship placement that goes out of vertical bounds', () => {
      // A length-5 ship starting at row 6 would reach row 10 (out of 0-9 bounds)
      expect(board.placeShip(carrier, [6, 0], 'vertical')).toBe(false);
      expect(board.board[6][0]).toBeNull();
    });

    test('rejects overlapping ships', () => {
      board.placeShip(carrier, [2, 2], 'horizontal'); // Occupies [2,2] through [2,6]
      // Try placing destroyer vertically crossing [2,4]
      expect(board.placeShip(destroyer, [1, 4], 'vertical')).toBe(false);
      // Ensure the overlapping attempt did not overwrite existing cells or empty cells
      expect(board.board[1][4]).toBeNull();
      expect(board.board[2][4]).toBe(carrier);
    });
  });

  describe('receiveAttack', () => {
    beforeEach(() => {
      board.placeShip(destroyer, [0, 0], 'horizontal'); // Occupies [0,0] and [0,1]
    });

    test('records a hit on the correct ship', () => {
      expect(board.receiveAttack([0, 0])).toBe('hit');
      expect(destroyer.hits).toBe(1);
    });

    test('records missed attacks accurately', () => {
      expect(board.receiveAttack([5, 5])).toBe('miss');
      expect(board.missedAttacks).toContainEqual([5, 5]);
      expect(destroyer.hits).toBe(0);
    });
  });

  describe('allShipsSunk', () => {
    beforeEach(() => {
      board.placeShip(destroyer, [0, 0], 'horizontal');
    });

    test('returns false when ships still have remaining health', () => {
      board.receiveAttack([0, 0]);
      expect(board.allShipsSunk()).toBe(false);
    });

    test('returns true when all placed ships are sunk', () => {
      board.receiveAttack([0, 0]);
      board.receiveAttack([0, 1]);
      expect(board.allShipsSunk()).toBe(true);
    });
  });
});
