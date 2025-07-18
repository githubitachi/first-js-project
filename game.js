// Step 4: Declare score variables
let humanScore = 0;
let computerScore = 0;

// Step 2: Get computer choice
function getComputerChoice() {
  const randomNum = Math.random();
  if (randomNum < 0.34) {
    return "rock";
  } else if (randomNum < 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Step 3: Get human choice
function getHumanChoice() {
  const choice = prompt("Enter rock, paper, or scissors:");
  return choice.toLowerCase();
}

// Step 5: Play one round
function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();

  if (humanChoice === computerChoice) {
    console.log(`It's a tie! You both chose ${humanChoice}`);
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    console.log(`You win! ${humanChoice} beats ${computerChoice}`);
  } else {
    computerScore++;
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
  }

  console.log(`Score => You: ${humanScore} | Computer: ${computerScore}`);
}

// Step 6: Play full game
function playGame() {
  humanScore = 0;
  computerScore = 0;

  for (let i = 1; i <= 5; i++) {
    console.log(`\nRound ${i}`);
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }

  console.log("\n--- Final Result ---");
  if (humanScore > computerScore) {
    console.log("🎉 You won the game!");
  } else if (humanScore < computerScore) {
    console.log("😢 You lost the game.");
  } else {
    console.log("🤝 It's a draw!");
  }
}

// Start the game
playGame();
