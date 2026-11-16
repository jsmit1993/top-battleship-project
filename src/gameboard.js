import { Ships } from "./ships.js";

class Gameboard{
    constructor() {
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
        this.ships = [];
        this.missedAttacks = [];
    }

    receiveAttack([x,y]) {
        const target = this.board[x][y];

        if (target === null) {
        this.missedAttacks.push([x, y]);
        return 'miss';
        } else {
        target.hit();
        return 'hit';
        }
    }

    placeShip(ship, [x,y], direction = 'horizontal') {
        if (direction === 'horizontal' && y + ship.length > 10) return false;
        if (direction === 'vertical' && x + ship.length > 10) return false;
        for (let i = 0; i < ship.length; i++) {
            const targetX = direction === 'vertical' ? x + i : x;
            const targetY = direction === 'horizontal' ? y + i : y;
            if (this.board[targetX][targetY] !== null) return false;
        }

        for (let i = 0; i < ship.length; i++) {
            const targetX = direction === 'vertical' ? x + i : x;
            const targetY = direction === 'horizontal' ? y + i : y;
            this.board[targetX][targetY] = ship;
        }

        this.ships.push(ship);
        return true;
    }

    allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export {Gameboard}