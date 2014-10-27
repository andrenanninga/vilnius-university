/* jslint node: true */

'use strict';

var EventEmitter = require('events').EventEmitter;

var Labyrinth = function() {
  this.map = null;

  this.emitter = new EventEmitter();
};

Labyrinth.operations = [
  { x: -1, y: 0, _name: 'west' },
  { x: 0, y: -1, _name: 'south' },
  { x: 1, y: 0, _name: 'east' },
  { x: 0, y: 1, _name: 'north' },
];

Labyrinth.prototype.reset = function() {
  this.move = 0;
  this.moves = 0;
  this.success = false;
};

Labyrinth.prototype.setMap = function(map) {
  this.map = JSON.parse(JSON.stringify(map));

  this.width = map[0].length;
  this.height = map.length;
};

Labyrinth.prototype.cloneMap = function() {
  return JSON.parse(JSON.stringify(this.map));
};

Labyrinth.prototype.solve = function(algorithm, x, y) {
  algorithm = algorithm || 'depth-first';

  this.reset();

  if(algorithm === 'depth-first') {
    this.map[y][x] = 2;
    this.move = 2;

    this.emitter.emit('doMove', x, y, this.move);

    this.step(x, y);
  }
  else if(algorithm === 'breadth-first') {
    this.map[y][x] = 2;
    this.waveMap = this.cloneMap();

    this.open = [{ x: x, y: y }];
    this.closed = [];

    this.emitter.emit('wave-node-open', x, y);

    this.wave();
  }
};

Labyrinth.prototype.step = function(x, y) {
  for(var i = 0; i < Labyrinth.operations.length && !this.success; i += 1) {
    var operation = Labyrinth.operations[i];

    var dx = x + operation.x;
    var dy = y + operation.y;

    if(dx >= 0 && dx < this.width && dy >= 0 && dy< this.height) {
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
};

Labyrinth.prototype.wave = function() {
  while(!this.success) {
    var node = this.open.splice(0, 1)[0];

    for(var i = 0; i < Labyrinth.operations.length && !this.success; i += 1) {
      var operation = Labyrinth.operations[i];

      var dx = node.x + operation.x;
      var dy = node.y + operation.y;


      if(dx >= 0 && dx < this.width && dy >= 0 && dy< this.height) {
        if(this.waveMap[dy][dx] === 0) {
          this.waveMap[dy][dx] = this.waveMap[node.y][node.x] + 1;
          this.emitter.emit('wave-node-open', dx, dy);

          if(dx === 0 || dx === this.width - 1 || dy === 0 || dy === this.height - 1) {
            this.success = true;

            this.back(dx, dy);
          }
          else {
            this.open.push({ x: dx, y: dy });
          }
        }
      }
    }

    this.closed.push(node);
  }
};

Labyrinth.prototype.back = function(x, y) {
  this.map[y][x] = this.waveMap[y][x];
  this.emitter.emit('wave-path', x, y);

  while(this.waveMap[y][x] !== 2) {
    for(var i = 0; i < Labyrinth.operations.length; i += 1) {
      var operation = Labyrinth.operations[i];

      var dx = x + operation.x;
      var dy = y + operation.y;

      if(dx >= 0 && dx < this.width && dy >= 0 && dy< this.height) {
        if(this.waveMap[dy][dx] === this.waveMap[y][x] -1) {
          x = dx;
          y = dy;

          this.emitter.emit('wave-path', x, y);

          this.map[y][x] = this.waveMap[y][x];
          break;
        }
      }
    }
  }
};

module.exports = Labyrinth;