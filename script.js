const gameBoard = document.getElementById('game-board');
const nextPieceContainer = document.getElementById('next-piece');
const scoreElement = document.getElementById('score-value');

let score = 0;
let board = [];
let currentPiece = null;
let nextPiece = null;
let intervalId = null;

// Initialize game board
for (let i = 0; i < 20; i++) {
  board.push([]);
  for (let j = 0; j < 10; j++) {
    board[i].push(0);
  }
}

// Function to render game board
function renderBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.className = board[i][j] === 1? 'filled' : '';
      gameBoard.appendChild(cell);
    }
  }
}

// Function to generate a new piece
function generatePiece() {
  const pieces = [
    [[1, 1], [1, 1]], // O-piece
    [[1, 1, 1, 1]], // I-piece
    [[1, 0, 0], [1, 1, 1]], // J-piece
    [[0, 0, 1], [1, 1, 1]], // L-piece
    [[1, 1], [0, 1], [0, 1]], // S-piece
    [[0, 1], [0, 1], [1, 1]], // Z-piece
    [[1], [1], [1], [1]] // T-piece
  ];
  const randomIndex = Math.floor(Math.random() * pieces.length);
  return pieces[randomIndex];
}

// Function to render next piece
function renderNextPiece() {
  nextPieceContainer.innerHTML = '';
  for (let i = 0; i < nextPiece.length; i++) {
    for (let j = 0; j < nextPiece[i].length; j++) {
      const cell = document.createElement('div');
      cell.className = nextPiece[i][j] === 1? 'filled' : '';
      nextPieceContainer.appendChild(cell);
    }
  }
}

// Function to update score
function updateScore() {
  scoreElement.textContent = score;
}

// Function to check for collisions
function checkCollision() {
  for (let i = 0; i < currentPiece.length; i++) {
    for (let j = 0; j < currentPiece[i].length; j++) {
      if (currentPiece[i][j] === 1) {
        const x = j + currentPiece.x;
        const y = i +currentPiece.y;
        if (x < 0 || x >= 10 || y < 0 || y >= 20) {
          return true;
        }
        if (board[y][x] === 1) {
          return true;
        }
      }
    }
  }
  return false;
}

// Function to move piece down
function moveDown() {
  if (checkCollision()) {
    // Piece has collided, update board and score
    for (let i = 0; i < currentPiece.length; i++) {
      for (let j = 0; j < currentPiece[i].length; j++) {
        if (currentPiece[i][j] === 1) {
          const x = j + currentPiece.x;
          const y = i + currentPiece.y;
          board[y][x] = 1;
        }
      }
    }
    score += 10;
    updateScore();
    currentPiece = null;
  } else {
    // Move piece down
    currentPiece.y++;
  }
}

// Function to rotate piece
function rotatePiece() {
  // Rotate piece clockwise
  const newPiece = [];
  for (let i = 0; i < currentPiece.length; i++) {
    newPiece.push([]);
    for (let j = 0; j < currentPiece[i].length; j++) {
      newPiece[i].push(currentPiece[currentPiece.length - j - 1][i]);
    }
  }
  currentPiece = newPiece;
}

// Function to start game
function startGame() {
  currentPiece = generatePiece();
  nextPiece = generatePiece();
  renderNextPiece();
  intervalId = setInterval(moveDown, 1000);
}

// Start game
startGame();

// Add event listeners for user input
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    moveDown();
  } else if (event.key === 'ArrowLeft') {
    // Move piece left
    currentPiece.x--;
  } else if (event.key === 'ArrowRight') {
    // Move piece right
    currentPiece.x++;
  } else if (event.key === 'ArrowUp') {
    rotatePiece();
  }
});
