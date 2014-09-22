'use strict';

var Hanoi = require('./hanoi');
var opts = require('nomnom')
  .option('discs', {
    abbr: 'd',
    help: 'The total amount of discs used for the puzzle',
    required: true
  })
  .option('algorithm', {
    abbr: 'a',
    default: 'recursive',
    choices: ['recursive', 'iterative']
  })
  .parse();

var hanoi = new Hanoi(opts.discs);
hanoi.solve(opts.algorithm);