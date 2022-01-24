const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
let time = 0;
let score = 0;
const colors = ['linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)', 'linear-gradient(90deg, #e316b0 0%, #ec30dc 47%, #690854 100%)', 'linear-gradient(90deg, #2af155 0%, #1aca1a 47%, #07813a 100%)', 'linear-gradient(90deg, #cff71e 0%, #afca12 47%, #d8b90b 100%)', 'linear-gradient(90deg, #ffffff 0%, #757575 47%, #333333 100%)', '#3498db', '#e67e22', '#2ecc71'];

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
   }

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})


function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class ="primary">${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect();

  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  circle.style.background = getRandomColor();
  

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
