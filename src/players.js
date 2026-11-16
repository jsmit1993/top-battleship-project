import { Gameboard } from "./gameboard.js";

class Player {
    constructor(type = 'human') {
        this.type = type;
        this.gameboard = new Gameboard();
        this.previousAttacks = new Set();
    }
    attack(enemyBoard, coords) {
    let targetCoords = coords;

    // If this is a computer player and no specific coordinates were passed, pick a random legal spot
    if (this.type === 'computer' && !targetCoords) {
      targetCoords = this.generateRandomMove();
    }

    const key = `${targetCoords[0]},${targetCoords[1]}`;

    // Prevent attacking the exact same coordinate twice
    if (this.previousAttacks.has(key)) {
      return false;
    }

    this.previousAttacks.add(key);
    return enemyBoard.receiveAttack(targetCoords);
  }

  generateRandomMove() {
    // Safety check: stop if all 100 squares on a 10x10 board have been attacked
    if (this.previousAttacks.size >= 100) return null;

    let x, y, key;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (this.previousAttacks.has(key));

    return [x, y];
  }
}

export {Player}