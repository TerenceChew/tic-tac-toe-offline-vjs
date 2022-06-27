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

// add event listener to each board position
boardPositions.forEach(position => {
  position.addEventListener('click', handleBoardClick)
})

// handle board click
function handleBoardClick(event) {
  let { id, classList } = event.target;
  if (!gameEnd && boardArr[id] === '') {
    boardArr[id] = currentPlayer;
    currentPlayer === 'X' ? classList.add('purple') : classList.add('cyan');
    updateBoardPositions();
    checkWin(); // always check for win whenever board updates
  }
}

// update what the board displays according to boardArr in game status
function updateBoardPositions() {
  boardPositions.forEach((position, i) => {
    position.innerText = boardArr[i];
  });
}

// handle button click to reset the game
function handleButtonClick() {
  resetGame();
}

// reset game
function resetGame() {
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
function endGame(winner) {
  showResult(winner);
  showButton();
  gameEnd = true;
  turn.innerText = 'GAME END';
}

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

// switch to next player
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // change player
  turn.innerText = `${currentPlayer}'s Turn`;
}

// check for win
function checkWin() {
  const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  // check if any combination is true
  let winnerFound = winningCombinations.some(combination => {
    let a = boardArr[combination[0]];
    let b = boardArr[combination[1]];
    let c = boardArr[combination[2]];
    
    return a !== '' && a === b && b === c;
  });

  // check for any empty positions on board
  let boardIsNotFull = boardArr.includes('');

  if (winnerFound) {
    winner = currentPlayer;
    endGame(winner);
  } else if (boardIsNotFull) {
    switchPlayer();
  } else {
    winner = 'DRAW!';
    endGame(winner);
  }
}


