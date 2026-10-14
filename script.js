const WINNING_SCORE = 5; // играем до пяти побед

let humanScore = 0;
let computerScore = 0;

// ===== Элементы страницы =====
const choiceButtons = document.querySelectorAll(".choice");
const humanScoreElement = document.querySelector("#human-score");
const computerScoreElement = document.querySelector("#computer-score");
const roundResultElement = document.querySelector("#round-result");
const gameResultElement = document.querySelector("#game-result");
const restartButton = document.querySelector("#restart");

// ===== Ход компьютера =====
function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3); // 0, 1 или 2

  if (randomNumber === 0) {
    return "rock";
  } else if (randomNumber === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

// ===== Помощники =====
// true, если первый ход бьёт второй
function beats(first, second) {
  return (
    (first === "rock" && second === "scissors") ||
    (first === "paper" && second === "rock") ||
    (first === "scissors" && second === "paper")
  );
}

// Название хода по-русски, отвечает на вопрос «кто?»: камень бьёт…
function nameWho(choice) {
  if (choice === "rock") {
    return "камень";
  } else if (choice === "paper") {
    return "бумага";
  } else {
    return "ножницы";
  }
}

// Название хода, отвечает на вопрос «что?»: …бьёт бумагу
function nameWhat(choice) {
  if (choice === "paper") {
    return "бумагу";
  }
  return nameWho(choice); // «камень» и «ножницы» не меняются
}

// «камень бьёт ножницы», «ножницы бьют бумагу»
function describeWin(winner, loser) {
  const verb = winner === "scissors" ? "бьют" : "бьёт"; // ножницы — множественное число
  return `${nameWho(winner)} ${verb} ${nameWhat(loser)}`;
}

// ===== Игра =====
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    roundResultElement.textContent = `Ничья: оба выбрали ${nameWhat(humanChoice)}.`;
  } else if (beats(humanChoice, computerChoice)) {
    humanScore++;
    roundResultElement.textContent = `Раунд твой: ${describeWin(humanChoice, computerChoice)}.`;
  } else {
    computerScore++;
    roundResultElement.textContent = `Раунд за компьютером: ${describeWin(computerChoice, humanChoice)}.`;
  }

  updateScore();
  checkGameOver();
}

function updateScore() {
  humanScoreElement.textContent = humanScore;
  computerScoreElement.textContent = computerScore;
}

function checkGameOver() {
  if (humanScore < WINNING_SCORE && computerScore < WINNING_SCORE) {
    return; // никто ещё не набрал 5 очков — играем дальше
  }

  gameResultElement.textContent = humanScore === WINNING_SCORE ? "Победа за тобой! 🎉" : "Победил компьютер.";
  choiceButtons.forEach((button) => {
    button.disabled = true; // после конца игры ходить нельзя
  });
  restartButton.hidden = false;
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  updateScore();
  roundResultElement.textContent = "Сделай первый ход!";
  gameResultElement.textContent = "";
  choiceButtons.forEach((button) => {
    button.disabled = false;
  });
  restartButton.hidden = true;
}

// ===== События =====
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.id, getComputerChoice()); // id кнопки — это ход: "rock", "paper" или "scissors"
  });
});

restartButton.addEventListener("click", resetGame); // передаём саму функцию, без скобок
