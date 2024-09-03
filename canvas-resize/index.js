// selection
const canvas = document.querySelector("canvas");

// modification
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

ctx.fillRect(10, 10, 20, 20);
ctx.fillRect(30, 50, 20, 20);
ctx.fillRect(70, 30, 20, 20);
ctx.fillRect(100, 10, 20, 20);
