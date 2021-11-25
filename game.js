"use strict";

import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

export let EXPANSION_RATE = 1;
export let INCREASE_VELOCITY = {
  points: 4,
  coefficient: 1,
};

let SNAKE_SPEED = 4;

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

const difficultSelectors =
  document.getElementsByClassName("difficult-selector");

function setDifficult(points, coefficient, expansion_rate, snake_speed) {
  INCREASE_VELOCITY.points = points;
  INCREASE_VELOCITY.coefficient = coefficient;
  EXPANSION_RATE = expansion_rate;
  SNAKE_SPEED = snake_speed;
}

for (let difficultSelector of difficultSelectors) {
  difficultSelector.addEventListener("click", (e) => {
    switch (e.target.innerHTML) {
      case "Fácil":
        setDifficult(4, 1, 1, 2);
        break;
      case "Medio":
        setDifficult(3, 2, 1, 3);
        break;
      case "Crazy":
        setDifficult(4, 2, 2, 4);
        break;
    }
    const gameDifficult = document.getElementById("game-difficult");
    gameDifficult.style.display = "none";
  });
}

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

export function incrementSpeed() {
  SNAKE_SPEED += INCREASE_VELOCITY.coefficient;
}
