let currentPlayer = 1;
let board = ['', '', '', '', '', '', '', '', ''];
let players = ['', ''];
let winner = null;
let moves = 0;
let score = [0, 0];

function startGame() {
  players[0] = document.getElementById('player1').value;
  players[1] = document.getElementById('player2').value;
  currentPlayer = 1;
  board = ['', '', '', '', '', '', '', '', ''];
  winner = null;
  moves = 0;
  updateMessage(`${players[currentPlayer - 1]} começa!`);
  render();
}

function playerMove(index) {
  if (!winner && !board[index]) {
    board[index] = currentPlayer;
    moves++;
    if (checkWinner()) {
      winner = currentPlayer;
      score[winner - 1]++;
      updateMessage(`${players[winner - 1]} vence!`);
    } else if (moves === 9) {
      updateMessage('Empate!');
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updateMessage(`${players[currentPlayer - 1]}'s vez`);
    }
    render();
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function updateMessage(msg) {
  document.getElementById('message').textContent = msg;
}

function render() {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementsByClassName('cell')[i];
    cell.textContent = board[i] ? players[board[i] - 1] : '';
  }
  document.getElementById('score').textContent = `${players[0]}: ${score[0]} | ${players[1]}: ${score[1]}`;
}
