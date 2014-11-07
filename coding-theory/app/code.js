'use strict';

var _ = require('underscore');

var Word = require('./word');
var log2 = require('./math/log2');

var Code = function() {
  this.set.apply(this, arguments);
};

Code.prototype.set = function() {
  var words;
  this.words = [];

  if(_.isArray(arguments[0])) {
    words = arguments[0];
  }
  else {
    words = Array.prototype.slice.call(arguments, 0);
  }

  for(var i = 0; i < words.length; i++) {
    var word = words[i];

    if(word instanceof Word) {
      this.words.push(word);
    }
    else {
      this.words.push(new Word(words[i]));
    }
  }

  this.n = this.words[0].length;
  this.length = this.words.length;

  this.informationRate = this.getInformationRate();
};

Code.prototype.getInformationRate = function() {
  return (1 / this.n) * log2(this.length);
};

Code.prototype.addParityCheckDigits = function() {
  for(var i = 0; i < this.words.length; i += 1) {
    this.words[i].addParityCheckDigit();
  }

  this.set(this.words);
};

module.exports = Code;