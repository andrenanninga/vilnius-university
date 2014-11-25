'use strict';

var _ = require('underscore');
var colors = require('colors/safe');

var box    = ['─', '│', '┌', '┐', '└', '┘'];
var circle = ['─', '│', '╭', '╮', '╰', '╯'];
var line   = ['═', '║', '╔', '╗', '╚', '╝'];

var Print = function(width, height) {
  this.screen = this.makeScreen(width, height);

  this.color = colors.white;
};

Print.prototype.makeScreen = function(width, height) {
  var self = this;

  return _.map(Array(height), function() { return self.repeat(width, '∙').split(''); });
};

Print.prototype.repeat = function(n, character) {
  return Array(n + 1).join(character);
};

Print.prototype.drawStringOnScreen = function(screen, content, x, y) {
  for(var i = x; i < x + content.length; i++) {
    if(content[i - x] !== '∙') {
      screen[y][i] = this.color(content[i - x]);
    }
  }

  return screen;
};

Print.prototype.drawScreenOnScreen = function(screen, subScreen, x, y) {
  for(var i = 0; i < subScreen.length; i++) {
    screen = this.drawStringOnScreen(screen, subScreen[i], x, y + i);
  }

  return screen;
};

Print.prototype.put = function(screen, character, x, y) {
  screen[y][x] = character;

  return screen;
};

Print.prototype.box = function(content, x, y) {
  this.color = colors.blue;

  return this.border(content, box, x, y);
};

Print.prototype.circle = function(content, x, y) {
  this.color = colors.green;

  return this.border(content, circle, x, y);
};

Print.prototype.border = function(content, border, x, y) {
  var screen = this.makeScreen(content.length + 4, 3);

  var top = border[2] + this.repeat(content.length + 2, border[0]) + border[3];
  var middle = border[1] + ' ' + content + ' ' + border[1];
  var bottom = border[4] + this.repeat(content.length + 2, border[0]) + border[5];

  screen = this.drawStringOnScreen(screen, top, 0, 0);
  screen = this.drawStringOnScreen(screen, middle, 0, 1);
  screen = this.drawStringOnScreen(screen, bottom, 0, 2);

  return this.drawScreenOnScreen(this.screen, screen, x, y);
};

Print.prototype.line = function(start, end) {
  var i;
  var width = Math.abs(end.x - start.x) + 1;
  var height = Math.abs(end.y - start.y) + 1;
  var border = line;

  this.color = colors.white;

  var screen = this.makeScreen(width, height);

  if(start.y === end.y) {
    this.drawStringOnScreen(screen, this.repeat(width, border[0]), 0, 0);
  }
  else if(start.y < end.y) {
    this.drawStringOnScreen(screen, this.repeat(width, border[0]), 0, 0);
    this.drawStringOnScreen(screen, border[3], width - 1, 0);
    for(i = 1; i <= height - 1; i++) {
      this.drawStringOnScreen(screen, border[1], width - 1, i);
    }
  }
  else if(start.y > end.y) {
    this.drawStringOnScreen(screen, this.repeat(width, border[0]), 0, height - 1);
    this.drawStringOnScreen(screen, border[5], width - 1, height - 1);
    for(i = height - 2; i >= 0; i--) {
      this.drawStringOnScreen(screen, border[1], width - 1, i);
    }
  }

  return this.drawScreenOnScreen(this.screen, screen, Math.min(start.x, end.x), Math.min(start.y, end.y));
};

Print.prototype.toString = function() {
  return _.map(this.screen, function(row) { 
    return row.join('').replace(/∙/g, ' '); 
  }).join('\n');
};

module.exports = Print;

// new Print(52, 14);