// selection
const canvas = document.querySelector("canvas");

// modification
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context----------------------------
const ctx = canvas.getContext("2d");

// draw

function drawTree(startX, startY, length, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();

  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.lineWidth = branchWidth;

  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();

  if (length < 10) {
    // Leaves
    ctx.beginPath();
    ctx.arc(0, -length, 10, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  // Recursive branches
  drawTree(
    0,
    -length,
    length * 0.75,
    angle - 15,
    branchWidth * 0.7,
    color1,
    color2
  );
  drawTree(
    0,
    -length,
    length * 0.75,
    angle + 15,
    branchWidth * 0.7,
    color1,
    color2
  );

  ctx.restore();
}

function generateRandomTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const trunkHeight = Math.random() * 50 + 100;
  const trunkWidth = Math.random() * 10 + 10;
  const color1 = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, 0.8)`;
  const color2 = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, 0.5)`;

  drawTree(
    canvas.width / 2,
    canvas.height,
    trunkHeight,
    0,
    trunkWidth,
    color1,
    color2
  );
}

generateRandomTree();

// Make the tree regenerate when window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  generateRandomTree();
});

window.addEventListener("click", (e) => {
  ctx.beginPath();
  generateRandomTree();
  ctx.fillText("Hi Raihan! This is N I Rimon.", e.clientX, e.clientY);
});
