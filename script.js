const frame = document.querySelector('.frame');

const xBox = document.querySelector('.xBox');
const yBox = document.querySelector('.yBox');

let boxLeft = 0;
let boxTop = 0;
let speedRange1 = document.getElementById('speedRange1');
let speedRange2 = document.getElementById('speedRange2');

let deltaLeft = +speedRange1.value;
let deltaTop = +speedRange2.value;

speedRange1.oninput = function() {
    deltaLeft = this.value;
}

speedRange2.oninput = function() {
    deltaTop = this.value;
}

let widthRange1 = document.getElementById('widthRange1');
let heightRange1 = document.getElementById('heightRange1');
let widthRange2 = document.getElementById('widthRange2');
let heightRange2 = document.getElementById('heightRange2');

xBox.style.width = widthRange1.value + 'px';
xBox.style.height = heightRange1.value + 'px';
yBox.style.width = widthRange2.value + 'px';
yBox.style.height = heightRange1.value + 'px';

widthRange1.oninput = function() {
    xBox.style.width = this.value + 'px';
}

heightRange1.oninput = function() {
    xBox.style.height = this.value + 'px';
}

widthRange2.oninput = function() {
    yBox.style.width = this.value + 'px';
}

heightRange2.oninput = function() {
    yBox.style.height = this.value + 'px';
}

let frameWidth = frame.offsetWidth;
let frameHeight = frame.offsetHeight;

document.querySelectorAll('.xBox-sets .color button').forEach(function(btn) {
    btn.addEventListener('click', () => {
        xBox.style.backgroundColor = btn.style.backgroundColor;
    });
});

document.querySelectorAll('.yBox-sets .color button').forEach(function(btn) {
    btn.addEventListener('click', () => {
        yBox.style.backgroundColor = btn.style.backgroundColor;
    });
});



setInterval(() => {
    boxLeft += deltaLeft
    if (deltaLeft > 0) {
        if (boxLeft >= frameWidth - xBox.offsetWidth) {
            boxLeft = frameWidth - xBox.offsetWidth;
            deltaLeft = -deltaLeft;
        }
    } else {
        if (boxLeft <= 0) {
            boxLeft = 0;
            deltaLeft = -deltaLeft;
        }
    }
    xBox.style.left = boxLeft + 'px';


    boxTop += deltaTop
    if (deltaTop > 0) {
        if (boxTop >= frameHeight - yBox.offsetHeight) {
            boxTop = frameHeight - yBox.offsetHeight;
            deltaTop = -deltaTop;
        }
    } else {
        if (boxTop <= 0) {
            boxTop = 0;
            deltaTop = -deltaTop;
        }
    }
    yBox.style.top = boxTop + 'px';

}, 100)


window.addEventListener('resize', () => {
    // location = location;

    frameWidth = frame.offsetWidth;
    frameHeight = frame.offsetHeight;
})