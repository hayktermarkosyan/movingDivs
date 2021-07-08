const frame = document.querySelector('.frame');

const xMove = document.querySelector('.xMove');
const yMove = document.querySelector('.yMove');

let xDelta = 0;
let yDelta = 0;
let frameWidth = 1100;
let frameHeight = 510;

let timer = setTimeout(function move() {
    if (xDelta < frameWidth) {
        xDelta += 10;
        xMove.style.left = xDelta + 'px';
    } else if (xDelta > 0) {
        frameWidth = 0;
        xDelta -= 10;
        xMove.style.left = xDelta + 'px';
    } else {
        frameWidth = 1100;
    }

    if (yDelta < frameHeight) {
        yDelta += 10;
        yMove.style.top = yDelta + 'px';
    } else if (yDelta > 0) {
        frameHeight = 0;
        yDelta -= 10;
        yMove.style.top = yDelta + 'px';
    } else {
        frameHeight = 510;
    }

    timer = setTimeout(move, 50);
}, 100)