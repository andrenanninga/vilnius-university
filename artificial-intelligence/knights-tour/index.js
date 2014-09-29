'use strict';

var Tour = require('./tour');
var Table = require('cli-table');
var opts = require('nomnom')
  .option('size', {
    abbr: 's',
    help: 'Size of the board',
    default: 8,
    callback: function(value) {
      if(parseInt(value) < 5) {
        return 'Size must be atleast 5';
      }
    }
  })
  .option('start', {
    abbr: 't',
    help: 'Start position of the knight',
    default: [0, 0],
    transform: function(value) {
      return value.split(',').map(parseFloat);
    }
  })
  .parse();

var tour = new Tour(opts.size);
tour.start(opts.start[0], opts.start[1]);

var table = new Table();
tour.board.map(function(row) { table.push(row); });
console.log(table.toString());