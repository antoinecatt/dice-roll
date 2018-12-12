/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, bothDice;

let lastRoll;

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    // 1. Random Number
    const dice = Math.floor(Math.random() * 6) + 1; // Gives you a random number from 1-6 rounded down to the lowest
    const dice2 = Math.floor(Math.random() * 6) + 1; // Gives you a random number from 1-6 rounded down to the lowest

    // 2. Display the result
    const diceDOM = document.querySelector('.dice');
    const diceDOM2 = document.querySelector('.dice2');

    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';

    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1

    if (dice === 1 || dice2 === 1) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent =
        scores[activePlayer];
    }

    if (dice === 6 && lastRoll === 6) {
      // Player loses score
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent =
        scores[activePlayer];
    } else if (dice !== 1 && dice2 !== 1) {
      // Add Score
      bothDice = dice + dice2;
      roundScore += bothDice;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
    lastRoll = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    const setScore = document.getElementById('setScore').value;
    let score;

    if (setScore) {
      score = setScore;
    } else {
      score = 100;
    }

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= Number(score)) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('winner');
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

const nextPlayer = () => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
};

// Resets to a new game
const init = () => {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
};

init();
document.querySelector('.btn-new').addEventListener('click', init);

// CHALLENGE
// 1. A player loses his ENTIRE score when he rolls two 6 in a row. After that , it's the next player's turn (Hint: Always save the the previous dice roll in a separate variable)

// 2. Add an input field to the HTML where players can set the winning score , so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in Javascript. This is a good opportunity to use google to figure this out)

// 3. Add another dice to the game, so that there are two dices now. The player loses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice., so take a look at the CSS code for the first one.)
