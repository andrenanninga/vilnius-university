'use strict';

var Code = require('./lib/code');
var Word = require('./lib/word');

var code = new Code('000', '001', '010', '011', '100', '101', '110', '111');

console.log(new Word('00110').add(new Word('10100')));