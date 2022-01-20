const frame = document.querySelector('.frame');

const xBox = document.querySelector('.xBox');
const yBox = document.querySelector('.yBox');

let boxLeft = 0;
let boxTop = 0;
let speedRange1 = document.getElementById('speedRange1');
let speedRange2 = document.getElementById('speedRange2');

let deltaLeft = +speedRange1.value;
let deltaTop = +speedRange2.value;

let widthRange1 = document.getElementById('widthRange1');
let heightRange1 = document.getElementById('heightRange1');
let widthRange2 = document.getElementById('widthRange2');
let heightRange2 = document.getElementById('heightRange2');

xBox.style.width = widthRange1.value + 'px';
xBox.style.height = heightRange1.value + 'px';
yBox.style.width = widthRange2.value + 'px';
yBox.style.height = heightRange1.value + 'px';


widthRange1.oninput = function() {
    let x1 = xBox.offsetLeft + xBox.offsetWidth /2;
    let x2 = xBox.offsetLeft + this.valueAsNumber / 2;
    let dx = x1 - x2; // dx = xBox.offsetWidth /2 - this.valueAsNumber / 2

    if(dx < 0 && (xBox.offsetLeft + dx < frame.offsetLeft    // check left border
            || xBox.offsetLeft + dx + this.valueAsNumber > frame.offsetLeft + frame.offsetWidth)    // check right border
        ){
        return
    }

    xBox.style.left = xBox.offsetLeft + dx + 'px';
    xBox.style.width = this.value + 'px';
}

heightRange1.oninput = function() {
    xBox.style.top = 155 - (this.valueAsNumber - 100) / 2 + 'px';
    xBox.style.height = this.value + 'px';
}

widthRange2.oninput = function() {
    yBox.style.left = 408 - (this.valueAsNumber - 100) / 2 + 'px';
    yBox.style.width = this.value + 'px';
}

heightRange2.oninput = function() {
    let y1 = yBox.offsetTop + yBox.offsetHeight / 2;
    let y2 = yBox.offsetTop + this.valueAsNumber / 2;
    let dy = y1 - y2;

    let heightDifference = yBox.offsetHeight - this.valueAsNumber;

    if(dy < 0 && (yBox.offsetTop + dy < frame.offsetTop    // check top border
            || yBox.offsetTop + dy + this.valueAsNumber > frame.offsetTop + frame.offsetHeight)    // check bottom border
            ){
        return
    }

    yBox.style.top = yBox.offsetTop + dy + 'px';
    yBox.style.height = this.value + 'px';
    
    xBox.style.top = (xBox.offsetTop - (this.valueAsNumber + frame.offsetTop) 
                        + heightDifference) + 'px';
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



speedRange1.oninput = function() {
    deltaLeft = deltaLeft < 0 ? - this.valueAsNumber : this.valueAsNumber; 
    // deltaLeft = deltaLeft < 0 ? - parseInt(this.value) : parseInt(this.value); same
}

speedRange2.oninput = function() {
    deltaTop = deltaTop < 0 ? - this.valueAsNumber : this.valueAsNumber;
}



setInterval(() => {
    boxLeft += deltaLeft
    console.log()
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

    // boxes X and Y coordinates

    let xBoxRightSideTopCoordinateX = xBox.offsetLeft + xBox.offsetWidth;
    let xBoxLeftSideTopCoordinateX = xBox.offsetLeft;
    let xBoxLeftSideTopCoordinateY = xBox.offsetTop;
    let xBoxLeftSideBottomCoordinateY = xBox.offsetTop + xBox.offsetHeight;

    let yBoxRightSideTopCoordinateX = yBox.offsetLeft + yBox.offsetWidth;
    let yBoxLeftSideTopCoordinateX = yBox.offsetLeft;
    let yBoxLeftSideTopCoordinateY = yBox.offsetTop;
    let yBoxLeftSideBottomCoordinateY = yBox.offsetTop + yBox.offsetHeight;

    // opacity when cross
    if ((xBoxRightSideTopCoordinateX >= yBoxLeftSideTopCoordinateX && 
        xBoxLeftSideTopCoordinateX <= yBoxRightSideTopCoordinateX) && 
        (yBoxLeftSideBottomCoordinateY >= xBoxLeftSideTopCoordinateY &&
            yBoxLeftSideTopCoordinateY <= xBoxLeftSideBottomCoordinateY)) {
        xBox.style.opacity = 0.5;
    } else {
        xBox.style.opacity = 1;
    }
}, 5)


window.addEventListener('resize', () => {
    frameWidth = frame.offsetWidth;
    frameHeight = frame.offsetHeight;
})