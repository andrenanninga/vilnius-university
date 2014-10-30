/* jslint node: true */
/* jslint browser: true */

'use strict';

var Labyrinth = require('./labyrinth');
var Display = require('./display');

var canvas = document.getElementById('canvas');

var labyrinth = new Labyrinth();
var display = new Display(canvas, labyrinth);
window.display = display;

var maps = {
  basic: [
    [1, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 1 ,1],
    [1, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  advanced: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1],
    [1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,1],
    [1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1],
    [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,1],
    [1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1],
    [1,1,0,1,0,1,1,0,0,0,0,1,0,1,0,1],
    [1,1,0,1,0,1,1,0,1,1,0,1,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1,0,1,1,1,1,1],
    [1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1]
  ]
};

var selectedMap = maps.basic;

labyrinth.setMap(maps.basic);
labyrinth.map[3][4] = 2;

display.drawMap(labyrinth.map);

document.getElementById('map-basic').onchange = function() {
  if(this.checked) {
    display.reset();
    
    labyrinth.reset();
    labyrinth.setMap(maps.basic);
    labyrinth.map[3][4] = 2;
  
    display.drawMap(labyrinth.map);

    selectedMap = maps.basic;
  }
};

document.getElementById('map-advanced').onchange = function() {
  if(this.checked) {
    display.reset();
    
    labyrinth.reset();
    labyrinth.setMap(maps.advanced);
    labyrinth.map[3][4] = 2;

    display.drawMap(labyrinth.map);

    selectedMap = maps.advanced;
  }
};

document.getElementById('depth-first').onclick = function() {
  display.reset();
  
  labyrinth.reset();
  labyrinth.setMap(selectedMap);
  labyrinth.solve('depth-first', 4, 3);
  
  display.play();
};

document.getElementById('breadth-first').onclick = function() {
  display.reset();

  labyrinth.reset();
  labyrinth.setMap(selectedMap);
  labyrinth.solve('breadth-first', 4, 3);

  display.play();  
};

document.getElementById('play').onclick = function() {
  display.play();
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
