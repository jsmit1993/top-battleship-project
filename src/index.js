import './styless.css'; // Import your CSS so Webpack bundles it automatically
import { Player } from './players.js';
import { Ships } from './ships.js';
import { DOM } from './dom.js';

const playerBoardEl = document.getElementById('player-board');
const computerBoardEl = document.getElementById('computer-board');

let human = new Player('human');
let computer = new Player('computer');
let isGameOver = false;

// Helper to populate a board with standard Battleship fleet
function placePresetShips(gameboard) {
  const fleet = [
    { ship: new Ships(5), coords: Array.of(0, 0), dir: 'horizontal' }, // Row 0, Cols 0-4
    { ship: new Ships(4), coords: Array.of(2, 1), dir: 'vertical' },   // Rows 2-5, Col 1
    { ship: new Ships(3), coords: Array.of(4, 4), dir: 'horizontal' }, // Row 4, Cols 4-6
    { ship: new Ships(3), coords: Array.of(7, 2), dir: 'horizontal' }, // Row 7, Cols 2-4
    { ship: new Ships(2), coords: Array.of(6, 8), dir: 'vertical' },   // Rows 6-7, Col 8
  ];

  fleet.forEach(({ ship, coords, dir }) => {
    gameboard.placeShip(ship, coords, dir);
  });
}



function handlePlayerAttack(coords) {
  if (isGameOver) return;

  // 1. Human attacks computer
  const result = human.attack(computer.gameboard, coords);
  if (result === false) return; // Ignore clicks on already-attacked cells

  renderGame();

  if (computer.gameboard.allShipsSunk()) {
    isGameOver = true;
    DOM.updateStatus('Victory! You sank all enemy ships!');
    return;
  }

  // 2. Computer immediately takes its turn
  computer.attack(human.gameboard);
  renderGame();

  if (human.gameboard.allShipsSunk()) {
    isGameOver = true;
    DOM.updateStatus('Defeat! The computer sank your fleet.');
  }
}

function renderGame() {
  DOM.renderBoard(playerBoardEl, human, false);
  DOM.renderBoard(computerBoardEl, computer, true, handlePlayerAttack);
}

// Start the game
placePresetShips(human.gameboard);
placePresetShips(computer.gameboard);
renderGame();
