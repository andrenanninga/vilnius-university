/* jshint node: true */

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

  this.labyrinth.emitter.on('doMove', function() {
    self.states.push(JSON.parse(JSON.stringify(self.labyrinth.map)));
  });

  this.labyrinth.emitter.on('undoMove', function() {
    self.states.push(JSON.parse(JSON.stringify(self.labyrinth.map)));
  });

  this.labyrinth.emitter.on('wave-node-open', function() {
    self.states.push(JSON.parse(JSON.stringify(self.labyrinth.waveMap)));
  });

  this.labyrinth.emitter.on('wave-path', function() {
    self.states.push(JSON.parse(JSON.stringify(self.labyrinth.map)));
  });
};

Display.prototype.play = function() {
  if(!this.playing) {
    this.playing = setInterval(this.showNextState.bind(this), 50);
  }
  else {
    clearInterval(this.playing);
    this.playing = false;
  }
};

Display.prototype.stop = function() {
  this.state = -1;
  this.showNextState();

  if(this.playing) {
    clearInterval(this.playing);
    this.playing = false;
  }
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

Display.prototype.reset = function() {
  this.stop(); 

  this.state = -1;
  this.states = [];
};

Display.prototype.drawMap = function(map) {
  this.context.clearRect(0, 0, this.width, this.height);

  var cellWidth = this.width / this.labyrinth.width;
  var cellHeight = this.height / this.labyrinth.height;

  for(var x = 0; x < this.labyrinth.width; x += 1) {
    for(var y = 0; y < this.labyrinth.height; y += 1) {

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
      this.context.strokeStyle = '#263248';
      this.context.lineWidth = 1;

      this.context.fillRect(
        Math.floor(x * cellWidth), 
        Math.floor(y * cellHeight), 
        Math.ceil(cellWidth), 
        Math.ceil(cellHeight)
      );

      this.context.strokeRect(
        Math.floor(x * cellWidth), 
        Math.floor(y * cellHeight), 
        Math.ceil(cellWidth), 
        Math.ceil(cellHeight)
      );

      this.context.font = 'bold 11pt Calibri';
      this.context.fillStyle = tinycolor.mostReadable(fillStyle, ['#263248', '#7E8AA2']);
      this.context.fillText(cell, x * cellWidth + 5, y * cellHeight + 15);
    }
  }
};

module.exports = Display;