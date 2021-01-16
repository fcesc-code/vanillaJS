'use strict';

let canv;
let ctx;
const UI = {
    life: document.querySelector('#life'),
    apples: document.querySelector('#apples'),
    poison: document.querySelector('#poison'),
    points: document.querySelector('#points'),
    speed: document.querySelector('#speed')
};
canv = document.getElementById('gc');
ctx = canv.getContext('2d');

const params = {
    // canvas size (px)
    width: 0,
    height: 0,
    // grid cell size (px) and cell margin size (px)
    cs: 20,
    cm: 2,
    // horizontal and vertical cells number
    hc: 0,
    vc: 0,
    // movements per second
    mov: 5,
    // accelerate when eating an apple
    acc: true,
    // tile initial size
    initialTail: 3,
    // score system
    points: {
        apple: 20,
        poison: -15,
        selfEating: -10
    },
    // audio files
    audio: {
        gameover: 'assets/game_over.wav',
        gulp: 'assets/gulp.wav',
        shout: 'assets/shout.wav'
    }
}

const state = {
    game: {
        started: false,
        start: '',
        finish: '',
        turn: 0,
        apples: 0,
        lives: 3,
        poisoned: 0,
        longestTail: 0,
        points: 0,
    },
    // game velocity factor initial and current
    ini: 5,
    mov: 5,
    // player current position
    px: 0,
    py: 0,
    // player current velocity
    vx: 0,
    vy: 0,
    // player trail
    trail: [],
    tail: params.initialTail,
    // apple position
    ax: 15,
    ay: 15,
    // poison position
    dx: 5,
    dy: 5
}

init();

function init(){
    document.addEventListener('keydown', keyPush);
    state.game.started = true;
    state.game.start = new Date();
    params.width = parseInt(Math.floor(window.innerWidth - (window.innerWidth % params.cs)));
    params.height = parseInt(Math.floor((window.innerHeight * 0.8) - ((window.innerHeight * 0.8) % params.cs)));
    canv.width = params.width;
    canv.height = params.height;
    params.hc = params.width / params.cs;
    params.vc = params.height / params.cs;
    updateInfoUI();
    playTurn();
}

function playTurn(){
    if (state.game.lives > 0){
        state.game.turn++;
        setTimeout(() => {
            game();
        }, (1000/state.mov));
    } else {
        playSound(params.audio.gameover);
    }
}

function updateInfoUI(){
    UI.apples.innerHTML = `${state.game.apples}`;
    UI.poison.innerHTML = `${state.game.poisoned}`;
    UI.points.innerHTML = `${state.game.points}`;
    UI.speed.innerHTML = `${(state.game.turn === 0) ? 0 : Math.floor(1000/state.mov)} ms`;
    UI.life.innerHTML = `${state.game.lives}`;
}

function game(){
    // player position in current turn
    state.px += state.vx;
    state.py += state.vy;

    // wrap, the snake can go through borders and appear on the opposite side
    if (state.px < 0){
        state.px = params.hc - 1;
    }
    if (state.px > params.hc - 1){
        state.px = 0;
    }
    if (state.py < 0){
        state.py = params.vc - 1;
    }
    if (state.py > params.vc - 1){
        state.py = 0;
    }

    // draw background
    ctx.clearRect(0, 0, canv.width, canv.height);

    // draw snake
    ctx.fillStyle = 'lime';
    for (let i = 0; i < state.trail.length; i++){
        ctx.fillRect(state.trail[i].x*params.cs, state.trail[i].y*params.cs, params.cs-params.cm, params.cs-params.cm);
        if (state.trail[i].x === state.px && state.trail[i].y === state.py){
            //state.game.lives--;
            //console.log(`Your snake tried to eat itself. You are certainly not a good snake coach. \nOnly ${state.game.lives} lives left. Careful!`);
            state.tail = params.initialTail;
            state.mov = state.ini;
        }
    }
    state.trail.push({x: state.px, y: state.py});
    while (state.trail.length > state.tail){
        state.trail.shift();
    }

    // managing eating apples
    if (state.ax === state.px && state.ay === state.py){
        playSound(params.audio.gulp);
        state.game.apples++;
        state.game.points += params.points.apple;
        state.tail++;
        createApple();
        state.mov = Math.ceil(state.mov * 1.02);
        updateInfoUI();
    }
    // managing eating poison
    if (state.dx === state.px && state.dy === state.py){
        playSound(params.audio.shout);
        state.game.lives--;
        state.game.poisoned++;
        state.game.points += params.points.poison;
        state.tail == params.initialTail;
        createPoison();
        state.mov = state.ini;
        updateInfoUI();
    }  
    
    // draw apples
    ctx.fillStyle = 'red';
    ctx.fillRect(state.ax*params.cs, state.ay*params.cs, params.cs-params.cm, params.cs-params.cm);
    // draw poison
    ctx.fillStyle = 'white';
    ctx.fillRect(state.dx*params.cs, state.dy*params.cs, params.cs-params.cm, params.cs-params.cm);

    playTurn();
}

function createApple(){
    state.ax = randomCellX();
    state.ay = randomCellY();
}
function createPoison(){
    state.dx = randomCellX();
    state.dy = randomCellY();
}

function randomCellX(){
    return Math.floor(Math.random() * params.hc);
}
function randomCellY(){
    return Math.floor(Math.random() * params.vc);
}

function keyPush(evt){
    switch(evt.keyCode){
        case 37: // arrowLeft
            state.vx = -1; state.vy = 0;
            break;
        case 38: // arrowUp
            state.vx = 0; state.vy = -1;
            break;
        case 39: // arrowRight
            state.vx = 1; state.vy = 0;
            break;
        case 40: // arrowDown
            state.vx = 0; state.vy = 1;
            break;
    }
}

function playSound(input){
    let sound = new Audio(input);
    sound.play();
}