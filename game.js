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
    setTimeout(displayFinalResult, 1000); // Slight delay to show last round
  }
}

function displayFinalResult() {
  let message = "";

  if (humanScore > computerScore) {
    message = "🏆 Game Over: You won the game!";
  } else if (humanScore < computerScore) {
    message = "💀 Game Over: You lost the game.";
  } else {
    message = "🤝 Game Over: It's a draw!";
  }

  finalDiv.textContent = message;
  finalDiv.style.display = "block";
  finalDiv.classList.add("highlight"); // Optional class for animation or glow

  // Disable buttons
  document.querySelectorAll('.choice').forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = 0.5;
  });

  // Show "Play Again" button
  playAgainBtn.style.display = "inline-block";
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  round = 0;

  resultDiv.textContent = "Choose to start!";
  scoreDiv.textContent = `You: 0 | Computer: 0`;
  finalDiv.textContent = "";
  finalDiv.style.display = "none";
  finalDiv.classList.remove("highlight");

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
    resetGame();
  });

  playAgainBtn.addEventListener('click', resetGame);

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', () => {
      if (round >= maxRounds) return;

      const symbol = btn.innerText;
      const playerChoice =
        symbol.includes("🪨") ? "rock" :
        symbol.includes("📄") ? "paper" :
        symbol.includes("✂️") ? "scissors" : "";

      if (playerChoice) {
        playRound(playerChoice);
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 500);
      }
    });
  });
});
