/* jslint node: true */
/* jslint browser: true */

'use strict';

var Labyrinth = require('./labyrinth');
var Display = require('./display');

var canvas = document.getElementById('canvas');

var labyrinth = new Labyrinth();
var display = new Display(canvas, labyrinth);
window.display = display;

labyrinth.setMap([
  [1, 1, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1 ,1],
  [1, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1]
]);

labyrinth.setMap([
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,1,1,0,0,0,0,0,0,1,1],
  [1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1],
  [1,0,1,1,1,0,0,0,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,1],
  [1,1,0,1,0,1,1,0,1,1,0,0,0,1,0,1],
  [1,1,0,1,0,1,1,0,0,0,0,1,0,1,0,1],
  [1,1,0,1,0,1,1,0,1,1,0,1,0,0,0,1],
  [1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,1],
  [1,1,0,0,0,1,1,1,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1]
]);

labyrinth.solve(4, 3);
display.showNextState();

document.getElementById('play').onclick = function() {
  display.play();

  if(display.playing) {
    this.innerText = 'Pause';
  }
  else {
    this.innerText = 'Play';
  }
};

document.getElementById('stop').onclick = function() {
  display.stop();
};

document.getElementById('next').onclick = function() {
  display.showNextState();
};

document.getElementById('prev').onclick = function() {
  display.showPrevState();
};
