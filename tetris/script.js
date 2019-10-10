const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');
const playBtn = document.querySelector('#play-btn');
const scorePlace = document.querySelector('#score');
const endGame = document.createElement('div');
endGame.setAttribute('id', 'game-over');
endGame.innerHTML = 'GAME OVER';

const Z = [[[1,1,0],[0,1,1],[0,0,0]],
           [[0,0,1],[0,1,1],[0,1,0]],
           [[0,0,0],[1,1,0],[0,1,1]],
           [[0,1,0],[1,1,0],[1,0,0]]];
const S = [[[0,1,1],[1,1,0],[0,0,0]],
           [[0,1,0],[0,1,1],[0,0,1]],
           [[0,0,0],[0,1,1],[1,1,0]],
           [[1,0,0],[1,1,0],[0,1,0]]];
const O = [[[0,0,0,0],
           [0,1,1,0],
           [0,1,1,0],
           [0,0,0,0]]];
const T = [[[0,0,0],[1,1,1],[0,1,0]],
           [[0,1,0],[1,1,0],[0,1,0]],
           [[0,1,0],[1,1,1],[0,0,0]],
           [[0,1,0],[0,1,1],[0,1,0]]];
const I = [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
           [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
           [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
           [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]];
const J = [[[1,0,0],[1,1,1],[0,0,0]],
	       [[0,1,1],[0,1,0],[0,1,0]],
	       [[0,0,0],[1,1,1],[0,0,1]],
	       [[0,1,0],[0,1,0],[1,1,0]]];
const L = [[[0,1,0],[0,1,0],[0,1,1]],
           [[0,0,1],[1,1,1],[0,0,0]],
           [[1,1,0],[0,1,0],[0,1,0]],
           [[0,0,0],[1,1,1],[1,0,0]]];

const row = 20;
const column = 10;
const sqSize = 35;
const empty = 'white';
let score = 0;

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * sqSize, y * sqSize, sqSize, sqSize);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(x * sqSize, y * sqSize, sqSize, sqSize);
}

let board = [];
for(let r = 0; r < row; r++) {
  board[r] = [];
  for(let c = 0; c < column; c++){
    board[r][c] = empty;
  }
}

function drawBoard() {
  for(let r = 0; r < row; r++) {
    for(let c = 0; c < column; c++){
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

const PIECES = [
  [Z, 'red'],
  [S, 'blue'],
  [T, 'green'],
  [O, 'yellow'],
  [L, 'brown'],
  [I, 'orange'],
  [J, 'purple']
]

let dropStart = Date.now();
let timer = 800;
let gameOver = false;
function drop (){
  let now = Date.now();
  let delta = now - dropStart;
  if(delta > timer) {
    p.moveDown();
    dropStart = Date.now();
  }
  if(!gameOver) {
    requestAnimationFrame(drop);
  }
}

class Piece {
  constructor (emptySq, color){
    this.emptySq = emptySq;
    this.color = color;
    this.emptySqN = 0;
    this.activeEmptySq = this.emptySq[this.emptySqN];
    this.x = 3;
    this.y = -4;
  }
  
  fill(color){
    for(let r = 0; r < this.activeEmptySq.length; r++) {
      for(let c = 0; c < this.activeEmptySq.length; c++){
        if(this.activeEmptySq[r][c]) {
          drawSquare(this.x + c, this.y + r, color);
        }
      }
    }
  }
  
  draw(){
    this.fill(this.color);
  }
  
  delete(){
    this.fill(empty);
  }
  
  lock() {
    for(let r = 0; r < this.activeEmptySq.length; r++) {
      for(let c = 0; c < this.activeEmptySq.length; c++){
        if(!this.activeEmptySq[r][c]) {
          continue;
        }
        if(this.y + r < 0) {
          document.body.appendChild(endGame);
          gameOver = true;
          break;
        }
        board[this.y + r][this.x + c] = this.color;
      }
    }
    for(let r = 0; r < row; r++) {
      let isRowFull = true;
      for(let c = 0; c < column; c++) {
        isRowFull = isRowFull && (board[r][c] !== empty);
      }
      if(isRowFull) {
        for(let y = r; y > 1; y--) {
          for(let c = 0; c < column; c++) {
            board[y][c] = board[y - 1][c];
          }
        }
        for(let c = 0; c < column; c++) {
          board[0][c] = empty;
        }
        score += 10;
        timer = timer - 10;
      }
    }
    drawBoard();
    scorePlace.innerHTML = score;
  }
  
  moveDown(){
    if(!this.collision(0, 1, this.activeEmptySq)){
      this.delete();
      this.y++;
      this.draw();
    } else {
      this.lock();
      p = createRandom();
    }
  }
  
  moveRight(){
    if(!this.collision(1, 0, this.activeEmptySq)){
      this.delete();
      this.x++;
      this.draw();
    }
  }
  
  moveLeft(){
    if(!this.collision(-1, 0, this.activeEmptySq)){
      this.delete();
      this.x--;
      this.draw();
    }
  }
  
  rotate(){
    let next = this.emptySq[(this.emptySqN + 1) % this.emptySq.length];
    let kick = 0;
    if(this.collision(0, 0, next)){
      if(this.x > column / 2){
        kick = -1;
      } else {
        kick = 1;
      }
    }
    if(!this.collision(kick, 0, next)){
      this.delete();
      this.x += kick;
      this.emptySqN = (this.emptySqN + 1) % this.emptySq.length;
      this.activeEmptySq = this.emptySq[this.emptySqN];
      this.draw();
    }
  }
  
  collision(x, y, piece) {
    for(let r = 0; r < piece.length; r++) {
      for(let c = 0; c < piece.length; c++){
        if(!piece[r][c]) {
          continue;
        }
        let newX = this.x + c + x;
        let newY = this.y + r + y;
        if(newX< 0 || newX >= column || newY >= row){
          return true;
        }
        if(newY < 0) {
          continue;
        }
        if(board[newY][newX] !== empty){
          return true;
        }
      }
    }
    return false;
  }
}

function createRandom(){
  let random = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[random][0], PIECES[random][1]);
}

let p = createRandom();

document.addEventListener('keydown', control);

function control(event) {
  if(event.keyCode === 37) {
    p.moveLeft();
  } else if (event.keyCode === 38){
    p.rotate();
  } else if (event.keyCode === 39){
    p.moveRight();
  } else if (event.keyCode === 40){
    p.moveDown();
  }
}

p.draw();
playBtn.addEventListener('click', drop);
