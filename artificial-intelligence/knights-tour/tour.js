'use strict';

// The relative moves the knight is able to make
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

/**
 * Knight Tour Problem object
 *
 * @constructor
 * @param {int} size - The size of the sides of the board
 */
var Tour = function(size) {
  this.width = size;
  this.height = size;
  this.moves = size * size;

  // Reset the board to 0
  this.reset();
};

/**
 * Reset the board to 0
 */
Tour.prototype.reset = function() {
  // Initialize a new board
  this.board = [];

  // Loop through every field on the board and set the value to 0
  for(var i = 0; i < this.height; i++) {
    var row = [];

    for(var j = 0; j < this.width; j++) {
      row.push(0);
    }

    this.board.push(row);
  }
};

/**
 * Solve the Knights Tour Problem starting on the provided x and y
 *
 * @param {int} x - The x coordinate to start the knight on
 * @param {int} y - The y coordinate to start the knight on
 */
Tour.prototype.solve = function(x, y) {
  // Set the starting to position to 1 to indicate that the first move is made from here
  this.board[y][x] = 1;
  this.success = false;

  // Start the recursive method on the starting position
  this.step(2, y, x);
};

/**
 * Recursive method to determine the correct steps to solve the problem
 *
 * @param {int} move - The number of the next move to be made
 * @param {int} x - The x coordinate from which the next move must be made
 * @param {int} y - The y coordinate from which the next move must be made
 */
Tour.prototype.step = function(move, x, y) {
  // Loop through every operation available as long as the solution hasn't been found
  for(var i = 0; i < operations.length && !this.success; i++) {
    var operation = operations[i];

    // Use the relative operation coordinates to get the landing coordinates
    var dx = x + operation.dx;
    var dy = y + operation.dy;

    // Check if the landing coordinates are on the board
    if(dx >= 0 && dx < this.width && dy >= 0 && dy < this.height) {
      // Check if the landing coordinates haven't been used for a move yet
      if(this.board[dy][dx] === 0) {
        // Make the move
        this.board[dy][dx] = move;

        // Check if we made all the moves
        if(move == this.moves) {
          this.success = true;
        }
        // Otherwise we make the next move
        else {
          this.step(move + 1, dx, dy);

          // If no solution was found then we revert our move and try the next operation
          if(!this.success) {
            this.board[dy][dx] = 0;
          }
        }
      }  
    }
  }
};

module.exports = Tour;