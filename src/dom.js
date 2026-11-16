export const DOM = {
  renderBoard(boardElement, player, isEnemy = false, onCellClick = null) {
    boardElement.innerHTML = ''; // Clear previous render
    const gameboard = player.gameboard;

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x = x;
        cell.dataset.y = y;

        const cellContent = gameboard.board[x][y];
        const isMiss = gameboard.missedAttacks.some(
          ([mx, my]) => mx === x && my === y
        );

        // Optional: check gameboard.hitAttacks if you add a Set for hit coords
        const isHit = gameboard.hitAttacks?.has(`${x},${y}`);

        if (isHit) {
          cell.classList.add('hit');
        } else if (isMiss) {
          cell.classList.add('miss');
        } else if (cellContent !== null && !isEnemy) {
          // Only reveal unhit ships on the human player's board
          cell.classList.add('ship');
        }

        // Only attach click listeners to the enemy board
        if (isEnemy && onCellClick) {
          cell.addEventListener('click', () => onCellClick([x, y]));
        }

        boardElement.appendChild(cell);
      }
    }
  },

  updateStatus(message) {
    const statusEl = document.getElementById('status-message');
    if (statusEl) statusEl.textContent = message;
  },
};
