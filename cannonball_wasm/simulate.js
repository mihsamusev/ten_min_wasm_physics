import init, {add} from "./pkg/cannonball_wasm.js"
await init()

// canvas setup
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;

// scaling from simulation to canvas coordinates
var simMinWidth = 20.0;
var cScale = Math.min(canvas.width, canvas.height) / simMinWidth;
var simWidth = canvas.width / cScale;
var simHeight = canvas.height / cScale;

function ctxX(pos) {
  return pos.x * cScale;
}

function ctxY(pos) {
  return canvas.height - pos.y * cScale;
}

// scene
var gravity = { x: 0.0, y: -10.0 };
var timestep = 1.0 / 60.0;

var ball = {
  radius: 0.2,
  pos: { x: 0.2, y: 0.2 },
  vel: { x: 10.0, y: 15.0 },
};

function draw() {
  console.log(add(1, 1))
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000";

  ctx.beginPath();
  ctx.arc(
    ctxX(ball.pos),
    ctxY(ball.pos),
    cScale * ball.radius,
    0.0,
    2.0 * Math.PI
  );
  ctx.closePath();
  ctx.fill();
}

// button callbacks
var paused = true;
export function run() {
  var button = document.getElementById("buttonRun");
  if (paused) {
    button.innerHTML = "Stop";
  } else {
    button.innerHTML = "Run";
  }
  paused = !paused;
}

export function restart() {
  // reloads page
  location.reload();
}

var physicsScene = {
  gravity: { x: 0.0, y: -10.0 },
  timestep: 1.0 / 60.0,
  objects: [],
};
// simulation
function ball_step() {
  // ball update
  ball.vel.x += gravity.x * timestep;
  ball.vel.y += gravity.y * timestep;
  ball.pos.x += ball.vel.x * timestep;
  ball.pos.y += ball.vel.y * timestep;

  // collisions
  if (ball.pos.x < 0.0) {
    ball.pos.x = 0.0;
    ball.vel.x = -ball.vel.x;
  }
  if (ball.pos.x > simWidth) {
    ball.pos.x = simWidth;
    ball.vel.x = -ball.vel.x;
  }
  if (ball.pos.y < 0.0) {
    ball.pos.y = 0.0;
    ball.vel.y = -ball.vel.y;
  }
}

function simulate() {
  if (paused) {
    return;
  }
  ball_step();
}

function update() {
  simulate();
  draw();
  requestAnimationFrame(update);
}

update();
