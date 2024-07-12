const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const scoreElem = document.querySelector('p')
const reset = document.querySelector('button')
const mapWidth = canvas.width
const mapHeight = canvas.height
const speed = 100

let snakeDirection_x = 0, snakeDirection_y = 0
let food, snake
let score  = 0
let gameOver = false
let timer

class Food {
  constructor(position) {
    this.x = position.x
    this.y = position.y
    this.size = 20
  }
  draw() {
    ctx.fillStyle = 'greenyellow'
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
}

class Snake {
  constructor() {
    this.x = 40
    this.y = 0
    this.size = 20
    this.body = [ { x: this.x, y: this.y }]
  }
  draw() {
    ctx.fillStyle = 'red'
    this.body.forEach(body => {
      ctx.fillRect(body.x, body.y, this.size - 1, this.size - 1)
    });
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.body[score].x, this.body[score].y, this.size-1,this.size-1)
  }
  move() {
    if(!snakeDirection_x && !snakeDirection_y) return false 
    this.x += snakeDirection_x
    this.y += snakeDirection_y
    console.log(this.x);
    this.body.shift()
    this.body.push({ x: this.x, y: this.y })
  }
}

setup()
function setup() {
  snake = new Snake()
  food = new Food(randomFoodPosition())
  update()
}

function checkEatFood() {
  if(snake.x === food.x && snake.y === food.y) {
    snake.body.unshift(food.x, food.y)
    snake.body.shift()
    food = new Food(randomFoodPosition())
    score += 1
    updateScore()
  }
}

function randomFoodPosition() {
  const x = Math.floor(Math.random() * (mapWidth / 20)) * 20
  const y = Math.floor(Math.random() * (mapWidth / 20)) * 20
  // 防止food与snake重合
  for (let i = 0; i < snake.body.length; i++) {
    const body = snake.body[i];
    if(body.x === x && body.y === y) {
      return randomFoodPosition()
    }
  }
  return {x,y}
}

function checkSnakeBorder() {
  const head = snake.body[score]
  if (head.x < 0) {
    snake.x = mapWidth
  }else if(head.x >= mapWidth) {
    snake.x = -20
  }else if(head.y < 0) {
    snake.y = mapHeight
  }else if(snake.y >= mapHeight) {
    snake.y = -20
  }
}

function checkSnakeHeadEatBody() {
  const head = snake.body[score]
  for (let i = score-1; i >= 0; i--) {
    const body = snake.body[i];
    if (head.x === body.x && head.y === body.y) {
      gameOver = true
    }
  }
}

function updateScore() {
  scoreElem.innerHTML = `Score: ${score}`
}

function update() {
  if(gameOver) return false
  ctx.clearRect(0, 0, mapWidth, mapHeight)
  food.draw()
  snake.move()
  snake.draw()
  checkEatFood()
  checkSnakeBorder()
  checkSnakeHeadEatBody()
  timer = setTimeout(update, speed);
}

window.addEventListener('keydown', keyDown)
const keyUp = 87
const keyRight = 68
const keyBottom = 83
const keyLeft = 65
let keyFlag = false
function keyDown(e) {
  // console.log(e.keyCode);
  switch (e.keyCode) {
    case keyUp:
      if(snakeDirection_y === 20 || keyFlag) return
      snakeDirection_x = 0
      snakeDirection_y = -20
      keyFlag = true
      setTimeout(() => {
        keyFlag = false
      }, speed);
      break;
    case keyRight:
      if(snakeDirection_x === -20 || keyFlag) return
      snakeDirection_x = 20
      snakeDirection_y = 0
      keyFlag = true
      setTimeout(() => {
        keyFlag = false
      }, speed);
      break;
    case keyBottom:
      if(snakeDirection_y === -20 || keyFlag) return
      snakeDirection_x = 0
      snakeDirection_y = 20
      keyFlag = true
      setTimeout(() => {
        keyFlag = false
      }, speed);
      break;
    case keyLeft:
      if(snakeDirection_x === 20 || keyFlag) return
      snakeDirection_x = -20
      snakeDirection_y = 0
      keyFlag = true
      setTimeout(() => {
        keyFlag = false
      }, speed);
      break;
    default:
      break;
  }
}

reset.onclick = () => {
  clearTimeout(timer)
  score = 0
  updateScore()
  gameOver = false
  snakeDirection_x = 0
  snakeDirection_y = 0
  setup()
}