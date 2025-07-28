const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const winningLine = document.getElementById("winning-line");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize game
function init() {
  cells.forEach(cell => cell.addEventListener("click", handleClick));
  resetBtn.addEventListener("click", resetGame);
  updateStatus();
}

// On cell click
function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winCombo = checkWinner();
  if (winCombo) {
    animateWinningLine(winCombo);
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a Tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

// Check for winner
function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return condition;
    }
  }
  return null;
}

// Animate winning line
function animateWinningLine(combo) {
  const map = {
    "0,1,2": { top: "16.5%", left: "5%", width: "90%", rotate: "0deg" },
    "3,4,5": { top: "49.5%", left: "5%", width: "90%", rotate: "0deg" },
    "6,7,8": { top: "82.5%", left: "5%", width: "90%", rotate: "0deg" },

    "0,3,6": { top: "5%", left: "16.5%", width: "90%", rotate: "90deg" },
    "1,4,7": { top: "5%", left: "49.5%", width: "90%", rotate: "90deg" },
    "2,5,8": { top: "5%", left: "82.5%", width: "90%", rotate: "90deg" },

    "0,4,8": { top: "100%", left: "07%", width: "115%", rotate: "40deg" },
    "2,4,6": { top: "50%", left: "50%", width: "115%", rotate: "-40deg" },
  };

  const key = combo.join(",");
  const style = map[key];
  if (style) {
    winningLine.style.top = style.top;
    winningLine.style.left = style.left;
    winningLine.style.transform = `scaleX(1) rotate(${style.rotate})`;
    winningLine.style.width = style.width;
    winningLine.style.opacity = "1";
  }
}

// Update text
function updateStatus() {
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => (cell.textContent = ""));
  updateStatus();

  // Reset line animation
  winningLine.style.transform = "scaleX(0)";
  winningLine.style.opacity = "0";
  winningLine.style.transition = "none";
  // Delay restoring animation so it doesn't transition on reset
  setTimeout(() => {
    winningLine.style.transition = "all 0.5s ease-in-out";
  }, 50);
}

init();
