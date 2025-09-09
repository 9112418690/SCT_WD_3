let cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".statusText");
const restartBtn = document.querySelector(".restartBtn");
const resetScoresBtn = document.querySelector(".resetScoresBtn");
const toggleThemeBtn = document.querySelector(".toggleThemeBtn");
const winnerBanner = document.getElementById("winnerBanner");
const winnerText = document.getElementById("winnerText");
const playAgainBtn = document.getElementById("playAgainBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameIsOver = false;
let scores = { X: 0, O: 0 };
let darkMode = false;

let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const updateStatusText = () => {
  statusText.innerHTML = `Player ${currentPlayer}'s turn`;
};

const updateScores = () => {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
};

const showWinnerBanner = (player) => {
  winnerText.textContent = `🎉 Player ${player} Wins! 🎉`;
  winnerBanner.style.display = "flex";
};

const hideWinnerBanner = () => {
  winnerBanner.style.display = "none";
};

const checkForWinner = () => {
  winningConditions.forEach((combination) => {
    let check = combination.every(
      (index) => cells[index].innerHTML.trim() === currentPlayer
    );
    if (check) {
      statusText.innerHTML = `🎉 Player ${currentPlayer} wins!`;
      gameIsOver = true;

      combination.forEach((index) => {
        cells[index].classList.add("winning-cell");
      });

      scores[currentPlayer]++;
      updateScores();
      showWinnerBanner(currentPlayer);
    }
  });
};

const checkForDraw = () => {
  if (![...cells].some((cell) => cell.innerHTML.trim() === "") && !gameIsOver) {
    statusText.innerHTML = "🤝 It's a draw!";
    gameIsOver = true;
  }
};

updateStatusText();

cells = Array.from(cells);
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (gameIsOver || cell.innerHTML.trim() !== "") return;
    cell.innerHTML = currentPlayer;
    checkForWinner();
    checkForDraw();

    if (!gameIsOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateStatusText();
    }
  });
});

restartBtn.addEventListener("click", () => {
  restartGame();
});

resetScoresBtn.addEventListener("click", () => {
  scores = { X: 0, O: 0 };
  updateScores();
});

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkMode = !darkMode;
  toggleThemeBtn.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
});

playAgainBtn.addEventListener("click", () => {
  restartGame();
});

const restartGame = () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("winning-cell");
  });

  currentPlayer = "X";
  gameIsOver = false;
  hideWinnerBanner();
  updateStatusText();
};
