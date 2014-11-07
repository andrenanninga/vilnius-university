'use strict';

var Code = require('./code');
var Word = require('./word');

var code = new Code('000', '001', '010', '011', '100', '101', '110', '111');

console.log(code);
code.addParityCheckDigits();
console.log(code);

console.log(new Word('00110').distance(new Word('10100')));