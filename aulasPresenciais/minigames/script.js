const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const box = 20; // tamanho de cada quadrado
const canvasSize = 400;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = 'RIGHT';
let score = 0;

// Gera uma posição aleatória para a comida
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box,
};

// Controle da cobrinha
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

function draw() {
  // Limpa o canvas
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobrinha
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#00ff00' : '#00cc00';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Desenha a comida
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(food.x, food.y, box, box);

  // Posição atual da cabeça
  let headX = snake[0].x;
  let headY = snake[0].y;

  // Atualiza a direção da cabeça
  if (direction === 'LEFT') headX -= box;
  if (direction === 'RIGHT') headX += box;
  if (direction === 'UP') headY -= box;
  if (direction === 'DOWN') headY += box;

  // Verifica colisão com paredes
  if (
    headX < 0 || headX >= canvas.width ||
    headY < 0 || headY >= canvas.height ||
    collision(headX, headY, snake)
  ) {
    clearInterval(game);
    alert('Game Over! Pontuação: ' + score);
    return;
  }

  // Verifica se comeu a comida
  if (headX === food.x && headY === food.y) {
    score++;
    scoreEl.textContent = score;
    // Gera nova comida
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  } else {
    // Remove o último segmento
    snake.pop();
  }

  // Adiciona nova cabeça
  const newHead = { x: headX, y: headY };
  snake.unshift(newHead);
}

// Verifica colisão com o próprio corpo
function collision(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x === x && array[i].y === y) return true;
  }
  return false;
}

// Inicia o jogo
let game = setInterval(draw, 100);
