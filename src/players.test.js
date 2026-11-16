import { Player } from './players.js';
import { Ships } from './ships.js';

describe('Player', () => {
  let human;
  let computer;

  beforeEach(() => {
    human = new Player('human');
    computer = new Player('computer');
  });

  test('initializes with the correct type and an empty Gameboard', () => {
    expect(human.type).toBe('human');
    expect(computer.type).toBe('computer');
    expect(human.gameboard.board.length).toBe(10);
  });

  test('human player can attack enemy gameboard at specific coordinates', () => {
    const destroyer = new Ships(2);
    computer.gameboard.placeShip(destroyer, [0, 0], 'horizontal');

    expect(human.attack(computer.gameboard, [0, 0])).toBe('hit');
    expect(human.attack(computer.gameboard, [5, 5])).toBe('miss');
    expect(destroyer.hits).toBe(1);
  });

  test('prevents attacking the same coordinate twice', () => {
    expect(human.attack(computer.gameboard, [2, 2])).toBe('miss');
    expect(human.attack(computer.gameboard, [2, 2])).toBe(false);
  });

  test('computer player makes valid, non-repeating random attacks', () => {
    // Run 100 random computer attacks to fill the entire 10x10 board
    for (let i = 0; i < 100; i++) {
      const result = computer.attack(human.gameboard);
      expect(['hit', 'miss']).toContain(result);
    }

    // Verify 100 unique moves were recorded with zero duplicates
    expect(computer.previousAttacks.size).toBe(100);
  });
});
