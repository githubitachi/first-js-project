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

playAgainBtn.addEventListener('click', resetGame);

document.querySelectorAll('.choice').forEach(btn => {
  btn.classList.remove('active');
});
const clickedBtn = [...document.querySelectorAll('.choice')].find(btn => btn.innerText.includes(playerChoice[0].toUpperCase()));
if (clickedBtn) {
  clickedBtn.classList.add('active');
  setTimeout(() => clickedBtn.classList.remove('active'), 500);
}
