// selection
const canvas = document.querySelector("canvas");

// modification
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context
const ctx = canvas.getContext("2d");

// mouse dimentions
const mouse = {
  x: undefined,
  y: undefined,
};

const colorArray = ["red", "blue", "yellow", "gray", "green"];

const minRadius = 2;
const maxRadius = 100;

// circle instance
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.minRadius = radius;

  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  this.update = function () {
    // check position to prevent get lost
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    // increase the axis
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

function init() {
  const circleArray = [];

  for (let i = 0; i < 100; i++) {
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;

    let dx = Math.random() * 0.3 * 8;
    let dy = Math.random() * 0.3 * 8;
    let radius = Math.random() * 0.3 + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }

  const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach((circle) => {
      circle.update();
    });
  };
  animate();
}

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
});

init();
