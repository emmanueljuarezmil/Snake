"use strict";

import { 
    SNAKE_SPEED,
    update as updateSnake,
    draw as drawSnake,
    getSnakeHead,
    snakeIntersection
} from './snake.js'

import {
    update as updateFood,
    draw as drawFood
} from './food.js'

import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')

const main = (currentTime) => {
    if(gameOver) {
        if (confirm('Has perdido, deseas reiniciar el juego?')) {
            window.location = '/'
        }
        return
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

const checkDeath = () => {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

const update = () => {
    updateSnake()
    updateFood()
    checkDeath()
};

const draw = () => {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard)
    drawFood(gameBoard)
};