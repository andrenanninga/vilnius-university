'use strict';

var EventEmitter = require("events").EventEmitter;

var operations = [
  { x: -1, y: 0, _name: 'west' },
  { x: 0, y: -1, _name: 'south' },
  { x: 1, y: 0, _name: 'east' },
  { x: 0, y: 1, _name: 'north' },
];

var Labyrinth = function() {
  this.map = null;

  this.emitter = new EventEmitter();
};

Labyrinth.prototype.reset = function() {
  this.move = 0;
  this.moves = 0;
  this.success = false;
}

Labyrinth.prototype.setMap = function(map) {
  this.map = map;

  this.width = map[0].length;
  this.height = map.length;
};

Labyrinth.prototype.solve = function(x, y) {
  this.reset();
  this.map[y][x] = 2;
  this.move = 2;

  this.emitter.emit('doMove', x, y, this.move);

  this.step(x, y);
};

Labyrinth.prototype.step = function(x, y) {
  for(var i = 0; i < operations.length && !this.success; i++) {
    var operation = operations[i];

    var dx = x + operation.x;
    var dy = y + operation.y;

    if(dx >= 0 && dx < this.width && dy >= 0 & dy< this.height) {
      if(this.map[dy][dx] === 0) {
        this.moves += 1;
        this.move += 1;

        this.map[dy][dx] = this.move;
        this.emitter.emit('doMove', dx, dy, this.moves, operation._name);

        if(dx === 0 || dx === this.width - 1 || dy === 0 || dy === this.height - 1) {
          this.success = true;
        }
        else {
          this.step(dx, dy);

          if(!this.success) {
            this.map[dy][dx] = -1;
            this.move -= 1;
            
            this.emitter.emit('undoMove', dx, dy, this.moves, operation._name);
          }
        }
      }
    }
  }
}

module.exports = Labyrinth;