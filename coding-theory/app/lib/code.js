'use strict';

var _ = require('underscore');

var Word = require('./word');
var Matrix = require('./matrix');
var log2 = require('./math/log2');

var Code = function() {
  this.set.apply(this, arguments);
};

Code.prototype.set = function() {
  var words;
  this.words = [];
  this.n = 0;

  if(_.isArray(arguments[0])) {
    words = arguments[0];
  }
  else {
    words = Array.prototype.slice.call(arguments, 0);
  }

  for(var i = 0; i < words.length; i++) {
    var word = words[i];
    this.n = word.length;

    if(word instanceof Word) {
      this.words.push(word);
    }
    else {
      this.words.push(new Word(words[i]));
    }
  }

  this.length = this.words.length;
  this.informationRate = this.getInformationRate();
  // this.distance = this.getDistance();
};

Code.prototype.getInformationRate = function() {
  if(this.n === 0 || this.length === 0) {
    return 0;
  }

  return (1 / this.n) * log2(this.length);
};

Code.prototype.addParityCheckDigits = function() {
  for(var i = 0; i < this.words.length; i += 1) {
    this.words[i].addParityCheckDigit();
  }

  this.set(this.words);
};

Code.prototype.isLinear = function() {
  var checkResultValue = function(word) { return word.value === result.value; };

  for(var i = 0; i < this.words.length; i++) {
    for(var j = i + 1; j < this.words.length; j++) {
      var result = this.words[i].clone().add(this.words[j]);

      if(!_.find(this.words, checkResultValue)) {
        return false;
      }
    }
  }

  return true;
};

Code.prototype.getDistance = function() {
  var minDistance = Infinity;

  for(var i = 0; i < this.words.length; i++) {
    for(var j = i + 1; j < this.words.length; j++) {
      var distance = this.words[i].clone().distance(this.words[j]);

      if(distance < minDistance) {
        minDistance = distance;
      }
    }
  }

  return minDistance;
};

Code.prototype.toMatrix = function() {
  return new Matrix(this.words);
};

module.exports = Code;