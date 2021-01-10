/* Francesc Brugarolas - Skylab bootcamp 2020-07 - Precurs */
/* THIS CODE IS FROM https://www.youtube.com/watch?v=xGmXxpIj6vs Chris DeLeon, credits to the author. I was just copying and altering code to learn how it worked */
'use strict';

let canv;
let ctx;
window.onload = function () {
    canv = document.getElementById('gc');
    ctx = canv.getContext('2d');
    document.addEventListener('keydown', keyPush);
    setInterval(game, 1000/5);
}

// set player positions (at the middle of the board)
let px = 10;
let py = 10;
// set grid size and tile count
let gs = 20;
let tc = 20;
// set apple positions
let ax = 15;
let ay = 15;
// set velocity
let xv = 0; 
let yv = 0;
// set trail
let trail = [];
let tail = 5;


function game(){
    px += xv;
    py += yv;
    // wrap, the snake can go through borders and appear on the opposite
    if (px < 0){
        px = tc - 1;
    }
    if (px > tc - 1){
        px = 0;
    }
    if (py < 0){
        py = tc - 1;
    }
    if (py > tc - 1){
        py = 0;
    }
    // other stuff
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = 'lime';
    for (var i = 0; i < trail.length; i++){
        ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2);
        if (trail[i].x === px && trail[i].y === py){
            console.log('entered reduction to 5');
            tail = 5;
        }
    }
    trail.push({x: px, y: py});
    while (trail.length > tail){
        trail.shift();
    }
    if (ax === px && ay === py){
        console.log('an apple was eaten by a snake');
        tail++;
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);
}

function keyPush(evt){
    switch(evt.keyCode){
        case 37: // arrowLeft
            xv = -1; yv = 0;
            break;
        case 38: // arrowUp
            xv = 0; yv = -1;
            break;
        case 39: // arrowRight
            xv = 1; yv = 0;
            break;
        case 40: // arrowDown
            xv = 0; yv = 1;
            break;
    }
}