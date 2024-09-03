// selection
const canvas = document.querySelector("canvas");

// modification
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// rectangle
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 20, 20);
ctx.fillStyle = "rgba(255,255,10)";
ctx.fillRect(30, 50, 20, 20);
ctx.fillStyle = "rgb(0,220,60)";
ctx.fillRect(70, 30, 20, 20);
ctx.fillStyle = "#f2105432";
ctx.fillRect(100, 10, 20, 20);

// line
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(150, 350);
ctx.lineTo(250, 450);
ctx.strokeStyle = "red";
ctx.stroke();

// circle
ctx.arc(200, 200, 50, 0, Math.PI * 2, true);
ctx.stroke();

// new line circle
ctx.beginPath();
ctx.arc(320, 320, 50, 0, Math.PI * 2, true);
ctx.strokeStyle = "gray";
ctx.stroke();

for (let i = 0; i < 3; i++) {
  ctx.beginPath();
  ctx.arc(100 * i, 500, 50, 0, Math.PI * 2, true);
  ctx.strokeStyle = "gray";
  ctx.stroke();
}
