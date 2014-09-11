'use strict';

var Canvas = function(width, height) {
  this.width = width;
  this.height = height;

  this.content = [];

  for(var y = 0; y < height; y++) {
    var line = [];

    for(var x = 0; x < width; x++) {
      line.push(' ');
    }

    this.content.push(line);
  }
};

Canvas.prototype.setChar = function(x, y, char) {
  this.content[y][x] = char;
};

Canvas.prototype.toString = function() {
  var string = '';

  for(var y = 0; y < this.height; y++) {

    for(var x = 0; x < this.width; x++) {
      string += this.content[y][x];
    }

    string += '\n';
  }

  return string;
};

module.exports = Canvas;