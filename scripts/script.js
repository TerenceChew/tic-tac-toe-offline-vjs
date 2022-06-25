let page = document.querySelector('.page');
let turn = document.querySelector('.turn');
let boardPositions = Array.from(document.querySelectorAll('.board div'));

// game status
let gameEnd = false;
let currentPlayer = 'X';
let winner = '';
let board = new Array(9).fill('');
 
// handle board click
function handleBoardClick(event) {
  let { id, classList } = event.target;
  if (!gameEnd && board[id] === '') {
    board[id] = currentPlayer;
    currentPlayer === 'X' ? classList.add('purple') : classList.add('cyan');
    updateBoardPositions();
    checkWon(); // always check for win whenever board updates
  }
};

// update what the board displays according to the board in game status
function updateBoardPositions() {
  boardPositions.forEach((position, i) => {
    position.innerText = board[i];
  });
};

// add event listener to each board position
boardPositions.forEach(position => {
  position.addEventListener('click', handleBoardClick)
});

// show the winner
function showResult(winner) {
  let result = document.createElement('p');
  result.innerText = winner === 'DRAW!' ? winner : `${winner} Won!`;
  result.classList.add('result', 'animate__animated', 'animate__flash', 'animate__infinite');
  page.append(result);
};

// show the new game button
function showButton() {
  let btn = document.createElement('button');
  btn.innerText = 'New Game';
  btn.classList.add('btn', 'animate__animated', 'animate__zoomIn');
  btn.addEventListener('click', handleButtonClick); // add event listener to button
  page.append(btn);
};

// handle button click to reset the game
function handleButtonClick() {
  turn.innerText = 'X\'s Turn';
  gameEnd = false;
  currentPlayer = 'X';
  winner = '';
  board = new Array(9).fill('');
  page.lastElementChild.remove();
  page.lastElementChild.remove();
  updateBoardPositions();
  boardPositions.forEach(position => {
    position.classList.remove('purple', 'cyan');
  });
};

// end the game
function endGame() {
  gameEnd = true;
  turn.innerText = 'GAME END';
};

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
    let a = board[condition[0]];
    let b = board[condition[1]];
    let c = board[condition[2]];
    
    return a !== '' && a === b && b === c;
  });

  if (winnerFound) {
    winner = currentPlayer;
    showResult(winner);
    showButton();
    endGame();
  } else {
    let boardIsNotFull = board.includes('');

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
};


