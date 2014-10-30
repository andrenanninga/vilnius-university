'use strict';

var parse = require('./lib/parser');
var forwardChain = require('./lib/forward-chain');

var opts = require('nomnom')
  .option('chaining', {
    abbr: 'c',
    default: 'forward',
    choices: ['forward', 'backward'],
    metavar: 'DIRECTION',
    required: true
  })
  .option('file', {
    abbr: 'f',
    metavar: 'FILE',
    required: true
  })
  .parse();

if(opts.chaining === 'forward') {
  console.log('Forward chaining');

  parse(opts.file, function(err, data) {
    if(err) {
      console.error('[ERROR] parser:', err.message);
      process.exit(0);
    }
    else {
      forwardChain(data.rules, data.facts, data.goal);
    }
  });
}
else if(opts.chaining === 'backward') {
  console.log('Not yet supported.');
}