import { Ships } from "./ships";

describe('Ship class factory', () => {
    type: 'module',

    test('set size of ship and not sunk', () =>{
        const battleship = new Ships(6);
        expect(battleship.length).toBe(6);
        expect(battleship.hits).toBe(0);
        expect(battleship.isSunk()).toBe(false);
    });

    test('increment ship hit', () => {
        const cruiser = new Ships(3);
        cruiser.hit();
        expect(cruiser.hits).toBe(1);
    });

    test('should not be sunk initially', () => {
    const destroyer = new Ships(2);
    expect(destroyer.isSunk()).toBe(false);
  });

  test('should sink when hits match length', () => {
    const patrolBoat = new Ships(2);
    patrolBoat.hit();
    patrolBoat.hit();
    expect(patrolBoat.isSunk()).toBe(true);
  });
});