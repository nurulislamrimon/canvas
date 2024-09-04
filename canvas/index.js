// selection
const canvas = document.querySelector("canvas");

// modification
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context----------------------------
const ctx = canvas.getContext("2d");

// mouse dimentions-------------------
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colorArray = ["red", "blue", "yellow", "gray", "green"];

const randomColor = function (colorArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
};

const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

// circles---------------------------------
function Particle(x, y, radius, color) {
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
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  };
}

// implimentation
let particles = [];
function init() {
  for (let i = 0; i < 10; i++) {
    const radius = 20;
    let x = randomIntFromRange(radius, window.innerWidth - radius);
    let y = randomIntFromRange(radius, window.innerHeight - radius);

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (
          getDistance(x, y, particles[j].x, particles[j].y) -
            (radius + particles[j].radius) <
          0
        ) {
          x = randomIntFromRange(radius, window.innerWidth - radius);
          y = randomIntFromRange(radius, window.innerHeight - radius);

          j = -1;
        }
      }
    }
    particles.push(new Particle(x, y, radius, randomColor(colorArray)));
  }
}
init();

// animation loop----------------------------------
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText("Collision", mouse.x, mouse.y);
  // print the particles
  particles.forEach((particle) => {
    particle.update();
  });
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
