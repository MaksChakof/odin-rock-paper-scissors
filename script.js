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

// ===== Ход игрока =====
function getHumanChoice() {
  const answer = prompt("Твой ход: rock, paper или scissors?");

  if (answer === null) {
    return ""; // нажали «Отмена» — пустой ход
  }

  return answer.trim().toLowerCase(); // "  RoCk " → "rock": регистр и пробелы не важны
}

// ===== Помощники =====
function isValidChoice(choice) {
  return choice === "rock" || choice === "paper" || choice === "scissors";
}

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

// ===== Игра из пяти раундов =====
function playGame() {
  const ROUNDS = 5;
  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    if (!isValidChoice(humanChoice)) {
      console.log(`Ход «${humanChoice}» не подходит, нужно rock, paper или scissors. Раунд не засчитан.`);
      return;
    }

    if (humanChoice === computerChoice) {
      console.log(`Ничья: оба выбрали ${nameWhat(humanChoice)}.`);
    } else if (beats(humanChoice, computerChoice)) {
      humanScore++;
      console.log(`Раунд твой: ${describeWin(humanChoice, computerChoice)}.`);
    } else {
      computerScore++;
      console.log(`Раунд за компьютером: ${describeWin(computerChoice, humanChoice)}.`);
    }
  }

  for (let round = 1; round <= ROUNDS; round++) {
    console.log(`--- Раунд ${round} из ${ROUNDS} ---`);
    playRound(getHumanChoice(), getComputerChoice());
    console.log(`Счёт: ты ${humanScore} — компьютер ${computerScore}`);
  }

  if (humanScore > computerScore) {
    console.log("Итог: победа за тобой!");
  } else if (computerScore > humanScore) {
    console.log("Итог: победил компьютер.");
  } else {
    console.log("Итог: ничья.");
  }
}

playGame();
