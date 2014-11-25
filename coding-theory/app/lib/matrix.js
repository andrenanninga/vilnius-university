'use strict';

var _ = require('underscore');

var Code = require('./code');
var Word = require('./word');

var Matrix = function() {
  this.set.apply(this, arguments);
};

Matrix.prototype.set = function() {
  var words;
  this.rows = [];

  if(_.isArray(arguments[0])) {
    words = arguments[0];
  }
  else {
    words = Array.prototype.slice.call(arguments, 0);
  }

  for(var i = 0; i < words.length; i++) {
    var word = words[i];

    if(word instanceof Word) {
      this.rows.push(word.value.split(''));
    }
    else {
      this.rows.push(word.split(''));
    }
  }

  this.width = this.rows[0].length;
  this.height =  this.rows.length;
};

Matrix.prototype.toCode = function() {
  var words = _.map(this.rows, function(row) { return row.join(''); });

  return new Code(words);
};

Matrix.prototype.getRow = function(i) {
  return this.rows[i];
};

Matrix.prototype.getColumn = function(i) {
  return _.map(this.rows, function(row) { return row[i]; });
};

Matrix.prototype.getCell = function(x, y) {
  return this.rows[y][x];
};

Matrix.prototype.setRow = function(i, row) {
  if(row instanceof Word) {
    row = row.value;
  }

  if(_.isString(row)) {
    row = row.split('');
  }

  this.rows[i] = row;
};

Matrix.prototype.setColumn = function(i, column) {
  if(column instanceof Word) {
    column = column.value;
  }

  _.each(this.rows, function(row, j) { row[i] = column[j]; });
};

Matrix.prototype.addRows = function(addition, base) {
  var word = new Word(this.getRow(base));
  addition = new Word(this.getRow(addition));

  word.add(addition);
  this.setRow(base, word);
};

Matrix.prototype.addColumns = function(addition, base) {
  var word = new Word(this.getColumn(base));
  addition = new Word(this.getColumn(addition));

  word.add(addition);
  this.setColumn(base, word);
};

Matrix.prototype.moveColumn = function(column, destination) {
  _.each(this.rows, function(row) {
    row.splice(destination, 0, row.splice(column, 1)[0]);
  });
};

Matrix.prototype.moveRow = function(row, destination) {
  this.rows.splice(destination, 0, this.rows.splice(row, 1)[0]);
};

Matrix.prototype.removeRow = function(i) {
  this.rows.splice(i, 1);
  this.height =  this.rows.length;
};

Matrix.prototype.removeColumn = function(i) {
  this.rows = _.map(this.rows, function(row) { row.splice(i, 1); return row; });
  this.width = this.rows[0].length;
};

Matrix.prototype.clone = function() {
  return this.toCode().toMatrix();
};

Matrix.prototype.toRREF = function() {
  var i;
  var onePositions = function(digit, i) { if(digit === '1') { return i; }};
  var filterUndefined = function(o) { return !_.isUndefined(o); };
  var filterTaken = function(o) { return o >= i; };
  var filterLeading = function(o) { return o !== leading; };

  for(i = 0; i < this.width; i++) {
    var column = this.getColumn(i);

    var ones = _.map(column, onePositions);
    ones = _.filter(ones, filterUndefined);

    var leading = _.filter(ones, filterTaken)[0];
    var other = _.filter(ones, filterLeading);


    if(leading !== i) {
      this.moveRow(leading, i);
      console.log('Move row ' + leading + ' to position ' + i);
      console.log(this.toString());
    }

    for(var j = 0; j < other.length; j++) {
      this.addRows(i, other[j]);
      console.log('Add row ' + i + ' to row ' + other[j]);
    }
    console.log(this.toString());
  }

  console.log('remove zerowords');

  for(i = 0; i < this.height; i++) {
    var word = new Word(this.getRow(i));

    if(word.isZeroword()) {
      this.removeRow(i);
      i -= 1;
    }
  }

  console.log(this.toString());
};

Matrix.prototype.transpose = function() {
  
};

Matrix.prototype.toString = function() {
  var string = _.map(this.rows, function(row) {
    return '│ ' + row.join(' ') + ' │';
  });

  string.unshift('┌' + Array(this.rows[0].length * 2 + 2).join(' ') + '┐');
  string.push('└' + Array(this.rows[0].length * 2 + 2).join(' ') + '┘');

  return string.join('\n');
};

module.exports = Matrix;