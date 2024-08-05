const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start")
const score = document.getElementById('score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let scorePt = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div")
    square.classList.add("square")
    grid.appendChild(square)
    squares.push(square)
  }

}
createGrid()

currentSnake.forEach(index => squares[index].classList.add("snake"))

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % 10 === 0 && direction === -1) ||
    (currentSnake[0] <= 10 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) return window.clearTimeout(timerId);

  const tail = currentSnake.pop()
  squares[tail].classList.remove("snake")
  currentSnake.unshift(currentSnake[0] + direction)

  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple')
    generateApple()
    // //grow our snake array
    squares[tail].classList.add('snake')
    currentSnake.push(tail)
    scorePt++
    score.textContent = ` ${scorePt}`
    // speed up our snake
    clearTimeout(timerId)
    intervalTime *= speed
    timerId = setInterval(move, intervalTime)
  }
  squares[currentSnake[0]].classList.add("snake")
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains('snake')) {
    squares[appleIndex].classList.add('apple')
  }
} generateApple()



function control(e) {
  switch (e.key) {
    case 'ArrowUp':
      direction = -width
      break;
    case 'ArrowDown':
      direction = width
      break;
    case 'ArrowLeft':
      direction = -1
      break;
    case 'ArrowRight':
      direction = 1
      break;
  }
}

document.addEventListener('keyup', control)

startBtn.addEventListener('click', function () {
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  squares[appleIndex].classList.remove('apple')
  clearTimeout(timerId)
  currentSnake = [2, 1, 0]
  currentSnake.forEach(index => squares[index].classList.add("snake"))
  direction = 1
  scorePt = 0
  score.textContent= ` ${scorePt}`
  intervalTime = 1000
  generateApple()
  timerId = setInterval(move, intervalTime)
})