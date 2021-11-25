"use strict";

import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

localStorage.getItem("highScore") || localStorage.setItem("highScore", 0);

const highScore = localStorage.getItem("highScore");

const gameInfo = document.getElementById("game-info");

const scoreToAppend = document.createElement("span");
const highScoreToAppend = document.createElement("span");
scoreToAppend.innerHTML = `SCORE 0`;
scoreToAppend.id = "score";
highScoreToAppend.innerHTML = `HIGHSCORE ${highScore}`;
highScoreToAppend.id = "high-score";
gameInfo.appendChild(scoreToAppend);
gameInfo.appendChild(highScoreToAppend);

function main(currentTime) {
  if (gameOver) {
    if (confirm("Has perdido, deseas iniciar una partida nueva?")) {
      window.location = "/";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;
  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
