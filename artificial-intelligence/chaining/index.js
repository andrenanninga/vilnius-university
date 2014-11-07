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
  .option('verbose', {
    abbr: 'v',
    flag: true
  })
  .parse();

if(opts.chaining === 'forward') {
  parse(opts.file, function(err, data) {
    if(err) {
      console.error('Error during parsing:');
      console.error('\t' + err.message);
      process.exit(0);
    }
    else {
      var path = forwardChain(data.rules, data.facts, data.goal);
    }
  });
}
else if(opts.chaining === 'backward') {
  console.log('Not yet supported.');
}