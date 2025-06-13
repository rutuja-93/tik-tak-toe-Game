let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let round = 0;
let xWins = 0;
let oWins = 0;

const statusDisplay = document.getElementById("status");
const roundDisplay = document.getElementById("round");
const xWinsDisplay = document.getElementById("x-wins");
const oWinsDisplay = document.getElementById("o-wins");
const cells = document.querySelectorAll(".cell");

function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    statusDisplay.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    round++;
    updateScores(currentPlayer);
  } else if (board.every(cell => cell !== "")) {
    statusDisplay.textContent = "🤝 It's a draw!";
    gameActive = false;
    round++;
    updateScores(); // No winner
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function updateScores(winner = "") {
  roundDisplay.textContent = `Round: ${round}`;
  if (winner === "X") {
    xWins++;
    xWinsDisplay.textContent = `Player X Wins: ${xWins}`;
  } else if (winner === "O") {
    oWins++;
    oWinsDisplay.textContent = `Player O Wins: ${oWins}`;
  }
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusDisplay.textContent = "Player X's turn";
  cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
