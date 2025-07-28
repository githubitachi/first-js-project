let humanScore = 0;
let computerScore = 0;
let round = 0;
const maxRounds = 5;

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * 3)];
}

function playRound(humanChoice) {
  if (round >= maxRounds) return;

  const computerChoice = getComputerChoice();
  let resultText = '';
  const winSound = document.getElementById('winSound');
  const loseSound = document.getElementById('loseSound');
  const tieSound = document.getElementById('tieSound');

  if (humanChoice === computerChoice) {
    resultText = `🤝 It's a tie! You both chose ${humanChoice}`;
    tieSound.play();
  } else if (
    (humanChoice === 'rock' && computerChoice === 'scissors') ||
    (humanChoice === 'paper' && computerChoice === 'rock') ||
    (humanChoice === 'scissors' && computerChoice === 'paper')
  ) {
    humanScore++;
    resultText = `🎉 You win! ${humanChoice} beats ${computerChoice}`;
    winSound.play();
  } else {
    computerScore++;
    resultText = `😢 You lose! ${computerChoice} beats ${humanChoice}`;
    loseSound.play();
  }

  round++;
  document.getElementById('result').textContent = resultText;
  document.getElementById('score').textContent = `You: ${humanScore} | Computer: ${computerScore}`;

  if (round === maxRounds) {
    displayFinalResult();
  }
}

function displayFinalResult() {
  const final = document.getElementById('final');
  if (humanScore > computerScore) {
    final.textContent = "🏆 Game Over: You won the game!";
  } else if (humanScore < computerScore) {
    final.textContent = "💀 Game Over: You lost the game.";
  } else {
    final.textContent = "🤝 Game Over: It's a draw!";
  }
}
