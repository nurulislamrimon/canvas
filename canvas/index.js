// selection
const canvas = document.querySelector("canvas");

// modification
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context----------------------------
const ctx = canvas.getContext("2d");

// mouse dimentions-------------------
const mouse = {
  x: innerWidth,
  y: innerHeight,
};

const gravity = 1;
const fraction = 0.95;

const colorArray = ["red", "blue", "yellow", "gray", "green"];

const randomIntFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = function (colorArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
};

// circles---------------------------------
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = function () {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * fraction;
    } else {
      // this is the main reason of gravity effect
      // It increase by 1. At last it becomes faster, and it switch with that speed. like: 16 -> -15
      this.dy += gravity;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
}

// implimentation
let ballArray = [];
function init() {
  ballArray = [];
  for (let i = 0; i < 50; i++) {
    const radius = randomIntFromRange(5, 20);
    const x = randomIntFromRange(0, canvas.width - radius);
    const y = randomIntFromRange(0, canvas.height);

    ballArray.push(
      new Ball(
        x,
        y,
        randomIntFromRange(1, 5),
        randomIntFromRange(5, 20),
        radius,
        randomColor(colorArray)
      )
    );
  }
}
init();

// animation loop----------------------------------
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText("hello", mouse.x, mouse.y);
  ballArray.forEach((ball) => ball.update());
}
animate();

// events---------------------------------------
window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
});
