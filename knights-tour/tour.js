'use strict';

var operations = [
  { dx:  2, dy:  1 },
  { dx:  1, dy:  2 },
  { dx: -1, dy:  2 },
  { dx: -2, dy:  1 },
  { dx: -2, dy: -1 },
  { dx: -1, dy: -2 },
  { dx:  1, dy: -2 },
  { dx:  2, dy: -1 }
];

var Tour = function(size) {
  this.width = size;
  this.height = size;
  this.moves = size * size;

  this.board = [];
  this.reset();
};

Tour.prototype.reset = function() {
  this.board = [];

  for(var i = 0; i < this.height; i++) {
    var row = [];

    for(var j = 0; j < this.width; j++) {
      row.push(0);
    }

    this.board.push(row);
  }
};

Tour.prototype.start = function(x, y) {
  this.board[y][x] = 1;

  this.success = false;
  this.step(2, y, x);
};

Tour.prototype.step = function(move, x, y) {
  for(var i = 0; i < operations.length && !this.success; i++) {
    var operation = operations[i];

    var dx = x + operation.dx;
    var dy = y + operation.dy;

    if(dx >= 0 && dx < this.width && dy >= 0 && dy < this.height) {
      if(this.board[dy][dx] === 0) {
        this.board[dy][dx] = move;

        if(move < this.moves) {
          this.step(move + 1, dx, dy);

          if(!this.success) {
            this.board[dy][dx] = 0;
          }
        }
        else {
          this.success = true;
        }
      }  
    }
  }
};

module.exports = Tour;