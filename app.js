/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// prevDice is for Coding Challenge 1
let predefinedScore,
  prevDice,
  scores,
  roundScore,
  activePlayer,
  dice,
  gamePlaying; //gamePlaying is a state variable

init();

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    // 3. Update the round score if the rolled number was NOT a one
    if (dice !== 1) {
      //* ************* Code Challenge 1 - A player loses his entire score when he rolls two 6 in a row. After that, it's the other player's turn/
      // console.log(`prevDice is ${prevDice}`);
      // console.log(`Dice is ${dice}`);
      if (dice == 6 && prevDice == 6) {
        scores[activePlayer] = 0;
        document.querySelector("#current-" + activePlayer).textContent = 0;
        document.querySelector("#score-" + activePlayer).textContent = 0;
        console.log("rolled two 6 in a row");
        nextPlayer();
      }
      ////*********** */

      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;

      prevDice = dice;
    } else {
      //Next player
      console.log("rolled 1");
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Coding Challenge 2 - Player can predefine the winning score
    predefinedScore = Number(document.querySelector("input").value) || 100;
    //console.log(predefinedScore);
    ////////////

    //Check if player won the game

    if (scores[activePlayer] >= predefinedScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");

      // Set State variable to false
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  prevDice = undefined;

  document.getElementById("current-0").innerHTML = "0";
  document.getElementById("current-1").innerHTML = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  //state variable
  gamePlaying = true;

  scores = [0, 0]; // 2 players' scores in one array
  roundScore = 0; // score in one round
  activePlayer = 0; //first player index

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").innerHTML = "Player 1";
  document.getElementById("name-1").innerHTML = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

// document.querySelector("#current-" + activePlayer).textContent = dice;
// document.querySelector("#current-" + activePlayer).innerHTML =
//   "<em>" + dice + "</em>";

// let x = document.querySelector("#score-0").textContent;
// console.log(x);
