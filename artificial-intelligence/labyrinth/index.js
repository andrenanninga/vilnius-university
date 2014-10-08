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
  [1,0,0,0,1,0,1,1,0,0,0,1,1,0,0,0],
  [1,1,1,0,1,0,0,1,1,0,1,1,0,0,1,1],
  [1,0,0,0,0,0,1,1,0,0,1,1,1,0,1,1],
  [1,0,1,1,1,0,0,0,0,1,1,0,0,0,1,1],
  [1,0,1,1,1,0,0,0,0,1,1,0,0,0,1,1],
  [1,0,0,0,0,0,1,0,1,1,0,1,0,1,1,1],
  [1,1,0,1,0,1,1,0,1,1,0,0,0,1,1,1],
  [1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,1],
  [1,1,0,0,0,1,1,1,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]);

labyrinth.solve(1, 1);
display.showNextState();

document.getElementById('next').onclick = function() {
  display.showNextState();
};

document.getElementById('prev').onclick = function() {
  display.showPrevState();
};

// console.log(display.states);
