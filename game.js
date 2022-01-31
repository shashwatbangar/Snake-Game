import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js';
import {update as updateFood, draw as drawFood} from './food.js'
import {outSideGrid} from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
    // this asks browser tell me when I can render next frame
    if(gameOver) {
        if(confirm('You Lose. Press OK To Restart.')) {
            window.location = '/'
        }
        return;
    }
    window.requestAnimationFrame(main);

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkForDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkForDeath() {
    gameOver = outSideGrid(getSnakeHead()) || snakeIntersection()
}