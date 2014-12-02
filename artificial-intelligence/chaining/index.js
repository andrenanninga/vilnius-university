'use strict';

var _ = require('underscore');
var util = require('util');
var parse = require('./lib/parser');
var forwardChain = require('./lib/forward-chain');
var BackwardChain = require('./lib/backward');

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

global.opts = opts;

parse(opts.file, function(err, data) {
  if(err) {
    console.error('Error during parsing:');
    console.error('\t' + err.message);
    process.exit(0);
  }

  console.log('facts:\t' + data.facts);
  util.print('rules:');
  _.each(data.rules, function(rule) { console.log('\t' + rule); });
  console.log('goal:\t' + data.goal);
  console.log('─────────────────────────────');

  var result;

  if(opts.chaining === 'forward') {
    console.log('forward chaining\n');
    result = forwardChain(data.rules, data.facts, data.goal);
  }
  else if(opts.chaining === 'backward') {
    console.log('backward chaining\n');
    result = new BackwardChain(data.rules, data.facts, data.goal);
  }
  
  console.log('─────────────────────────────');
  console.log('result:');

  _.each(result, function(rule) {
    util.print(rule.getNumber() + '  ');
  });
  util.print('\n');
});
