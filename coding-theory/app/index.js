'use strict';

var Code = require('./lib/code');
var Matrix = require('./lib/matrix');
var Word = require('./lib/word');

var code = new Code('110', '011', '100', '010', '001');
var matrix = code.toMatrix();

console.log(matrix.toString());
matrix.toRREF();

// console.log(code.getDistance());