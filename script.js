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

let particles = [];

const resolveCollision = (particle1, particle2) => {
  const xVelocityDiff = particle1.velocity.x - particle2.velocity.x;
  const yVelocityDiff = particle1.velocity.y - particle2.velocity.y;
  const xDist = particle1.x - particle2.x;
  const yDist = particle1.y - particle2.y;
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(yDist, xDist);
    // mass
    const m1 = particle1.mass;
    const m2 = particle2.mass;
    // velocity before equation
    const u1 = rotate(particle1.velocity, angle);
    const u2 = rotate(particle2.velocity, angle);
    // velocity after equation
    const v1 = {
      x: u1.x * ((m1 - m2) / (m1 + m2)) + u2.x * ((2 * m2) / (m1 + m2)),
      y: u1.y,
    };
    const v2 = {
      x: u2.x * ((2 * m1) / (m1 + m2)) + u2.x * ((m2 - m1) / (m1 + m2)),
      y: u2.y,
    };
    // rotate back
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    particle1.velocity.x = vFinal1.x;
    particle1.velocity.y = vFinal1.y;

    particle2.velocity.x = vFinal2.x;
    particle2.velocity.y = vFinal2.y;
  }
};

// circles---------------------------------
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.velocity = {
    x: Math.random() - 2,
    y: Math.random() - 2,
  };
  this.update = function () {
    this.draw();

    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;

      if (
        getDistance(this.x, this.y, particles[i].x, particles[i].y) -
          (this.radius + particles[i].radius) <
        0
      ) {
        this.color = particles[i].color;
        resolveCollision(this, particles[i]);
      }
    }

    if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
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
