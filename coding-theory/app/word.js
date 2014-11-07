'use strict';

var Word = function(value) {
  this.set(value);
};

Word.prototype.set = function(value) {
  this.value = value;
  this.length = value.length;
};

Word.prototype.distance = function(word) {
  if(word.length !== this.length) {
    return false;
  }

  var distance = 0;

  for(var i = 0; i < this.value.length; i += 1) {
    var ownDigit = this.value.charAt(i);
    var otherDigit = this.value.charAt(i);

    if(ownDigit !== otherDigit) {
      distance += 1;
    }
  }

  return distance;
};

Word.prototype.addParityCheckDigit = function() {
  var evenDigits = (this.value.match(/1/g) || []).length;

  this.set(this.value + (evenDigits % 2 ? '1' : '0'));
};

Word.prototype.toString = function() {
  return this.value;
};

module.exports = Word;