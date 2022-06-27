let page = document.querySelector('.page');
let title = document.querySelector('.title');
let turn = document.querySelector('.turn');
let board = document.querySelector('.board');
let boardPositions = Array.from(document.querySelectorAll('.board div'));


// game status
let gameEnd = false;
let currentPlayer = 'X';
let winner = '';
let boardArr = new Array(9).fill('');
 
// handle board click
function handleBoardClick(event) {
  let { id, classList } = event.target;
  if (!gameEnd && boardArr[id] === '') {
    boardArr[id] = currentPlayer;
    currentPlayer === 'X' ? classList.add('purple') : classList.add('cyan');
    updateBoardPositions();
    checkWon(); // always check for win whenever board updates
  }
}

// update what the board displays according to boardArr in game status
function updateBoardPositions() {
  boardPositions.forEach((position, i) => {
    position.innerText = boardArr[i];
  });
}

// add event listener to each board position
boardPositions.forEach(position => {
  position.addEventListener('click', handleBoardClick)
})

// show the winner
function showResult(winner) {
  let result = document.createElement('p');
  result.innerText = winner === 'DRAW!' ? winner : `${winner} Won!`;
  result.classList.add('result', 'animate__animated', 'animate__flash', 'animate__infinite');
  page.append(result);
}

// show the new game button
function showButton() {
  let btn = document.createElement('button');
  btn.innerText = 'New Game';
  btn.classList.add('btn', 'animate__animated', 'animate__zoomIn');
  btn.addEventListener('click', handleButtonClick); // add event listener to button
  page.append(btn);
}

// handle button click to reset the game
function handleButtonClick() {
  removeAnimation();
  turn.innerText = 'X\'s Turn';
  gameEnd = false;
  currentPlayer = 'X';
  winner = '';
  boardArr = new Array(9).fill('');
  page.lastElementChild.remove();
  page.lastElementChild.remove();
  updateBoardPositions();
  boardPositions.forEach(position => {
    position.classList.remove('purple', 'cyan');
  });
  addAnimation();
}

// remove animation by overriding CSS with style attribute
function removeAnimation() {
  title.style.animation = 'none';
  turn.style.animation = 'none';
  board.style.animation = 'none';
}

// add animation by removing CSS override
function addAnimation() {
  title.style.animation = null;
  turn.style.animation = null;
  board.style.animation = null;
}

// end the game
function endGame() {
  gameEnd = true;
  turn.innerText = 'GAME END';
}

// check for win
function checkWon() {
  const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  let winnerFound = winningConditions.some(condition => {
    let a = boardArr[condition[0]];
    let b = boardArr[condition[1]];
    let c = boardArr[condition[2]];
    
    return a !== '' && a === b && b === c;
  });

  if (winnerFound) {
    winner = currentPlayer;
    showResult(winner);
    showButton();
    endGame();
  } else {
    let boardIsNotFull = boardArr.includes('');

    if (boardIsNotFull) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // change player
      turn.innerText = `${currentPlayer}'s Turn`;
    } else {
      winner = 'DRAW!';
      showResult(winner);
      showButton();
      endGame();
    };
  };
}


