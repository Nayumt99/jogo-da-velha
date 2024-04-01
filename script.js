// Variáveis globais
let currentPlayer = 1;
let board = ['', '', '', '', '', '', '', '', ''];
let players = ['', ''];
let winner = null;
let moves = 0;
let score = [0, 0];
let isComputer = false;
let difficulty = 'medium'; // Nível de dificuldade padrão

// Mapeamento das células do tabuleiro
const cells = document.querySelectorAll('.cell');

// Função para iniciar o jogo
function startGame() {
  players[0] = document.getElementById('player1').value || 'Jogador 1';
  players[1] = document.getElementById('player2').value || 'Jogador 2';
  isComputer = document.getElementById('computer').checked;
  difficulty = document.getElementById('difficulty').value;
  currentPlayer = 1;
  board = ['', '', '', '', '', '', '', '', ''];
  winner = null;
  moves = 0;
  updateMessage(`${players[currentPlayer - 1]} começa!`);
  render();
}

// Função para fazer a jogada do jogador
function playerMove(index) {
  if (!winner && board[index] === '') {
    board[index] = currentPlayer;
    moves++;
    render();
    checkWinner();
    if (!winner) {
      currentPlayer = currentPlayer === 1 ? 2 : 1; // Alternar para o próximo jogador
      updateMessage(`${players[currentPlayer - 1]}'s vez`);
      if (isComputer && currentPlayer === 2) {
        computerMove();
      }
    }
  }
}

// Função para fazer a jogada do computador
function computerMove() {
  // Implemente a lógica para fazer a jogada do computador com base no nível de dificuldade
}

// Função para verificar o vencedor
function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      updateMessage(`${players[winner - 1]} vence!`);
      return;
    }
  }

  if (moves === 9) {
    winner = 0; // Empate
    updateMessage('Empate!');
  }
}

// Função para atualizar a mensagem de status
function updateMessage(msg) {
  document.getElementById('message').textContent = msg;
}

// Função para atualizar a exibição do tabuleiro
function render() {
  board.forEach((cell, index) => {
    cells[index].textContent = cell ? (cell === 1 ? 'X' : 'O') : ''; // Marca X ou O se a célula estiver preenchida
  });
}

// Função para reiniciar o jogo
function restartGame() {
  startGame();
}

// Função para fazer a jogada do computador
function computerMove() {
  let index;
  if (difficulty === 'easy') {
    index = getRandomEmptyCell(); // Faz uma jogada aleatória para o nível de dificuldade fácil
  } else if (difficulty === 'medium') {
    index = getRandomEmptyCell(); // Faz uma jogada aleatória para o nível de dificuldade médio
  } else if (difficulty === 'hard') {
    // Implemente uma lógica de jogada de computador para o nível de dificuldade difícil
  }

  if (index !== undefined) {
    setTimeout(() => playerMove(index), 500); // Adiciona um pequeno atraso antes da jogada do computador
  }
}

// Função auxiliar para obter uma célula vazia aleatória no tabuleiro
function getRandomEmptyCell() {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      emptyCells.push(i);
    }
  }
  if (emptyCells.length > 0) {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  } else {
    return undefined; // Retorna indefinido se não houver células vazias no tabuleiro
  }
}

