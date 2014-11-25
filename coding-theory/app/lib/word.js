'use strict';

var _ = require('underscore');

var Word = function(value) {
  this.set(value);
};

Word.prototype.set = function(value) {
  if(!value) {
    throw new Error('value required');
  }

  if(_.isArray(value)) {
    value = value.join('');
  }

  this.value = value;
  this.length = value.length;
  this.weight = this.getWeight();
};

Word.prototype.clone = function() {
  return new Word(this.value);
};

Word.prototype.add = function(word) {
  if(word.length !== this.length) {
    throw new Error('words must be same length');
  }

  var value = '';

  for(var i = 0; i < this.value.length; i += 1) {
    var ownDigit = parseInt(this.value.charAt(i));
    var otherDigit = parseInt(word.value.charAt(i));

    var digit = ownDigit + otherDigit;

    if(digit === 2) { digit = 0; }

    value += '' + digit;
  }

  this.set(value);

  return this;
};

Word.prototype.cross = function(word) {
  if(word.length !== this.length) {
    throw new Error('words must be same length');
  }

  var value = '';

  for(var i = 0; i < this.value.length; i += 1) {
    var ownDigit = parseInt(this.value.charAt(i));
    var otherDigit = parseInt(word.value.charAt(i));

    var digit = ownDigit * otherDigit;

    value += '' + digit;
  }

  this.set(value);

  return this;
};

Word.prototype.distance = function(word) {
  if(word.length !== this.length) {
    throw new Error('words must be same length');
  }

  var distance = 0;

  for(var i = 0; i < this.value.length; i += 1) {
    var ownDigit = this.value.charAt(i);
    var otherDigit = word.value.charAt(i);

    if(ownDigit !== otherDigit) {
      distance += 1;
    }
  }

  return distance;
};

Word.prototype.getWeight = function() {
  return (this.value.match(/1/g) || []).length;
};

Word.prototype.addParityCheckDigit = function() {
  var evenDigits = (this.value.match(/1/g) || []).length;

  this.set(this.value + (evenDigits % 2 ? '1' : '0'));

  return this;
};

Word.prototype.isZeroword = function() {
  return this.getWeight() === 0;
};

Word.prototype.toString = function() {
  return this.value;
};

module.exports = Word;