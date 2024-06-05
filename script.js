const gameBoard = document.querySelector('.game-board');
let score = 0;

// Generate random position for tetromino
function generateRandomPosition() {
  return {
    x: Math.floor(Math.random() * (gameBoard.clientWidth / 30 - 4)),
    y: -2
  };
}

// Generate random tetromino
function generateRandomTetromino() {
  const tetrominos = [
    [
      [1, 1, 1, 1]
    ],
    [
      [1, 1, 1],
      [0, 1]
    ],
    [
      [1, 1, 1],
      [1, 0, 0]
    ],
    [
      [1, 1],
      [1, 1]
    ],
    [
      [1, 1, 1, 1]
    ],
    [
      [1, 1],
      [1, 1]
    ],
    [
      [1, 1, 1],
      [0, 0, 1]
    ]
  ];
  const randomIndex = Math.floor(Math.random() * tetrominos.length);
  return tetrominos[randomIndex];
}

// Create tetromino
function createTetromino(position, tetromino) {
  tetromino.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === 1) {
        const div = document.createElement('div');
        div.style.left = `${position.x * 30}px`;
        div.style.top = `${position.y * 30}px`;
        gameBoard.appendChild.
