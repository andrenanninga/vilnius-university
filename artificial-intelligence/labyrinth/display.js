'use strict';

var tinycolor = require('tinycolor2');

var Display = function(canvas, labyrinth) {
  var self = this;

  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');

  this.width = this.canvas.width;
  this.height = this.canvas.height;

  this.labyrinth = labyrinth;

  this.state = -1;
  this.states = [];

  this.labyrinth.emitter.on('doMove', function(x, y, move, operation) {
    console.log('Move: ' + move + ' - Moved ' + operation + ' to [' + x + ', ' + y + ']');
    self.states.push(JSON.parse(JSON.stringify(self.labyrinth.map)));
  });

  this.labyrinth.emitter.on('undoMove', function(x, y, move, operation) {
    console.log('Move: ' + move + ' - Undid move ' + operation + ' to [' + x + ', ' + y + ']');
    self.states.push(JSON.parse(JSON.stringify(self.labyrinth.map)));
  });
};

Display.prototype.showNextState = function() {
  if(this.state + 1 < this.states.length) {
    this.state += 1;

    this.drawMap(this.states[this.state]);
  }
};

Display.prototype.showPrevState = function() {
  if(this.state > 0) {
    this.state -= 1;

    this.drawMap(this.states[this.state]);
  }
};

Display.prototype.drawMap = function(map) {
  this.context.clearRect(0, 0, this.width, this.height);

  var cellWidth = this.width / this.labyrinth.width;
  var cellHeight = this.height / this.labyrinth.height;

  for(var x = 0; x < this.labyrinth.width; x++) {
    for(var y = 0; y < this.labyrinth.height; y++) {

      var cell = map[y][x];
      var fillStyle;

      switch(cell) {
        case -1:
          fillStyle = '#7E8AA2';
          break;
        case 0:
          fillStyle = '#FFFFFF';
          break;
        case 1: 
          fillStyle = '#263248';
          break;
        default:
          fillStyle = '#FF9800';
      }

      this.context.fillStyle = fillStyle;
      this.context.strokeStyle = '#000000';

      this.context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      this.context.strokeRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);

      this.context.font = 'bold 11pt Calibri';
      this.context.fillStyle = tinycolor.mostReadable(fillStyle, ['#263248', '#7E8AA2']);
      this.context.fillText(cell, x * cellWidth + 5, y * cellHeight + 15);
    }
  }
};

module.exports = Display;