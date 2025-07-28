let humanScore = 0;
let computerScore = 0;
let round = 0;
const maxRounds = 5;

const resultDiv = document.getElementById('result');
const scoreDiv = document.getElementById('score');
const finalDiv = document.getElementById('final');
const playAgainBtn = document.getElementById('playAgain');

const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const tieSound = document.getElementById('tieSound');

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerChoice) {
  if (round >= maxRounds) return;

  const computerChoice = getComputerChoice();
  let resultMessage = "";

  if (playerChoice === computerChoice) {
    resultMessage = `🤝 It's a tie! You both chose ${playerChoice}`;
    tieSound.play();
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    humanScore++;
    resultMessage = `🎉 You win! ${playerChoice} beats ${computerChoice}`;
    winSound.play();
  } else {
    computerScore++;
    resultMessage = `😢 You lose! ${computerChoice} beats ${playerChoice}`;
    loseSound.play();
  }

  round++;
  resultDiv.textContent = resultMessage;
  scoreDiv.textContent = `You: ${humanScore} | Computer: ${computerScore}`;

  if (round === maxRounds) {
    displayFinalResult();
  }
}

function displayFinalResult() {
  if (humanScore > computerScore) {
    finalDiv.textContent = "🏆 Game Over: You won the game!";
  } else if (humanScore < computerScore) {
    finalDiv.textContent = "💀 Game Over: You lost the game.";
  } else {
    finalDiv.textContent = "🤝 Game Over: It's a draw!";
  }

  document.querySelectorAll('.choice').forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = 0.5;
  });

  playAgainBtn.style.display = "inline-block";
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  round = 0;

  resultDiv.textContent = "Choose to start!";
  scoreDiv.textContent = `You: 0 | Computer: 0`;
  finalDiv.textContent = "";
  playAgainBtn.style.display = "none";

  document.querySelectorAll('.choice').forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = 1;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const introLines = [
    "> Initializing Cyber Arena...",
    "> Loading neural link...",
    "> Syncing with Reality Matrix...",
    "> Boot Complete. Welcome, Player.",
  ];

  const introScreen = document.getElementById("introScreen");
  const gameContainer = document.getElementById("gameContainer");
  const startGameBtn = document.getElementById("startGameBtn");
  const consoleBox = document.getElementById("consoleBox");

  let lineIndex = 0;
  let charIndex = 0;

  function typeLine() {
    if (lineIndex < introLines.length) {
      if (charIndex < introLines[lineIndex].length) {
        consoleBox.innerHTML += introLines[lineIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeLine, 30);
      } else {
        consoleBox.innerHTML += "<br/>";
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, 500);
      }
    } else {
      startGameBtn.style.display = "inline-block";
    }
  }

  typeLine();

  startGameBtn.addEventListener("click", () => {
    introScreen.style.display = "none";
    gameContainer.style.display = "flex";
    resetGame(); // Ensure a fresh start
  });

  playAgainBtn.addEventListener('click', resetGame);

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const symbol = btn.innerText;
      const playerChoice =
        symbol === "🪨" ? "rock" :
        symbol === "📄" ? "paper" :
        symbol === "✂️" ? "scissors" : "";

      if (playerChoice) {
        playRound(playerChoice);
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 500);
      }
    });
  });
});
