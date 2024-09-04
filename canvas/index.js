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

const colorArray = ["red", "blue", "yellow", "gray", "green"];

const randomColor = function (colorArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
};

const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

// circles---------------------------------
function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.update = function () {
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

let circle1;
let circle2;
// implimentation
function init() {
  circle1 = new Circle(
    window.innerWidth / 2,
    window.innerHeight / 2,
    50,
    "black"
  );
  circle2 = new Circle(undefined, undefined, 20, "red");
}
init();

// animation loop----------------------------------
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillText("hello", mouse.x, mouse.y);
  // print circle 1
  circle1.update();

  // change propertise of circle2
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();

  if (
    getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <
    circle1.radius + circle2.radius
  ) {
    circle1.color = circle2.color;
  } else {
    circle1.color = "black";
  }
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
