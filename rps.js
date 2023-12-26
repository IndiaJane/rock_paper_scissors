//Using localStorage we were able to get the same value as earlier even though we refreshed the page.
//Remember that this is a string and has to be converted back as an object using JSON.parse
//'pickComputerMove' returns a value of whatever 'randomNumber' is rolled and then stored in a const variable in the function 'playGame' that figures out the results. The buttons then call the function 'playGame' and an alert is displayed of the results.



//Default Operator. If the left side is TRUE, use the left side. If the left side is FALSE, use the right side. 
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function playGame(playerMove) {

    const computerMove = pickComputerMove()
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        }
        else if (computerMove === 'paper') {
            result = 'You win!';
        }
        else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win!';
        }
        else if (computerMove === 'paper') {
            result = 'Tie.';
        }
        else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        }
        else if (computerMove === 'paper') {
            result = 'You lose.';
        }
        else if (computerMove === 'scissors') {
            result = 'You win!';
        }
    }

    if (result === 'You win!') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    //localStorage only supports strings. In order to turn an object into a string you can use JSON.Stringify
    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png" data_test="player-move" class="rps-Image">
        Computer
        <img src="images/${computerMove}-emoji.png" data_test="computer-move" class="rps-Image">`

}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = ` wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;

};



let pickComputerMove = () => {

    const randomNumber = Math.floor(Math.random() * 3);

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber <= 1) {
        computerMove = 'rock';
    }
    else if (randomNumber === 2) {
        computerMove = 'paper';
    }
    else if (randomNumber === 3) {
        computerMove = 'scissors'
    }
    return computerMove;
}