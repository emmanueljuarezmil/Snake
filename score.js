"use strict";

const gameInfo = document.getElementById("game-info");

export function updateScore(score, highScore) {
  const scoreElement = document.getElementById("score");
  const highScoreElement = document.getElementById("high-score");
  scoreElement.innerHTML = `SCORE ${score}`;
  highScoreElement.innerHTML = `HIGHSCORE ${highScore}`;
}
