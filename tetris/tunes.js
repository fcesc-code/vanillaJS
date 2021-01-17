'use strict';

const mainTune = [
  [329.6, 4],
  [246.9, 8],
  [261.6, 8],
  [293.6, 4],
  [261.6, 8],
  [246.9, 8],
  [220.0, 4],
  [220.0, 8],
  [261.6, 8],
  [329.6, 4],
  [293.6, 8],
  [261.6, 8],
  [246.9, 4],
  [246.9, 8],
  [261.6, 8],
  [293.6, 4],
  [329.6, 4],
  [261.6, 4],
  [220.0, 4],
  [220.0, 4],
  [0, 4],
  [0, 8],
  [293.6, 4],
  [349.2, 8],
  [440.0, 4],
  [392.0, 8],
  [349.2, 8],
  [329.6, 8/3],
  [261.6, 8],
  [329.6, 4],
  [293.6, 8],
  [261.6, 8],
  [246.9, 4],
  [246.9, 8],
  [261.6, 8],
  [293.6, 4],
  [329.6, 4],
  [261.6, 4],
  [220.0, 4],
  [220.0, 4],
  [0, 4]
]

const mainTune = [
  [329.6, 4],
  [246.9, 8],
  [261.6, 8],
  [293.6, 4],
  [261.6, 8],
  [246.9, 8],
  [220.0, 4],
  [220.0, 8],
  [261.6, 8],
  [329.6, 4],
  [293.6, 8],
  [261.6, 8],
  [246.9, 4],
  [246.9, 8],
  [261.6, 8],
  [293.6, 4],
  [329.6, 4],
  [261.6, 4],
  [220.0, 4],
  [220.0, 4],
  [0, 4],
  [0, 8],
  [293.6, 4],
  [349.2, 8],
  [440.0, 4],
  [392.0, 8],
  [349.2, 8],
  [329.6, 8/3],
  [261.6, 8],
  [329.6, 4],
  [293.6, 8],
  [261.6, 8],
  [246.9, 4],
  [246.9, 8],
  [261.6, 8],
  [293.6, 4],
  [329.6, 4],
  [261.6, 4],
  [220.0, 4],
  [220.0, 4],
  [0, 4]
]

let audioCtx = new(window.AudioContext || window.webkitAudioContext)();
let index = 0;
//mainTune.reverse();
let tempo = 200;

function playNote(frequency, duration) {
  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'square';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
      playMelody();
    }, duration);
}

function playMelody() {
  playNote( mainTune[index][0] * 2, 1000 * 256 / (mainTune[index][1] * tempo) );
  if (index === mainTune.length - 1) { index = -1 }
  index++;
}


playMelody();