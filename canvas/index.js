// selection
const canvas = document.querySelector("canvas");

// modification
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context
const ctx = canvas.getContext("2d");

// circle instance
class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;

    this.dx = dx;
    this.dy = dy;

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.strokeStyle = `rgb(${x},${y},${radius})`;
      ctx.stroke();
    };
    this.update = function () {
      // check position to prevent get lost
      if (x + radius > innerWidth || x - radius < 0) {
        dx = -dx;
      }

      if (y + radius > innerHeight || y - radius < 0) {
        dy = -dy;
      }
      // increase the axis
      x += dx;
      y += dy;
      this.draw();
    };
  }
}

const circleArray = [];

for (let i = 0; i < 100; i++) {
  let x = Math.random() * innerWidth;
  let y = Math.random() * innerHeight;
  let radius = 20;

  let dx = Math.random() * 0.3 * 8;
  let dy = Math.random() * 0.3 * 8;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  circleArray.forEach((circle) => circle.update());
};
animate();
