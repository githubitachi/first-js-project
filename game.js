function getComputerchoice(){
    const randomNum = Math.random

    if (randomNum < 0.33){
        return "rock";
    }
    else if (randomNum < 0.66){
        return "paper";
    }
    else return "scissors"
}