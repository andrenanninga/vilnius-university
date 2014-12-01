'use strict';

var _ = require('underscore');

var parse = require('./lib/parser');
var Print = require('./lib/print');
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

global.opts = opts;

if(opts.chaining === 'forward') {
  parse(opts.file, function(err, data) {
    if(err) {
      console.error('Error during parsing:');
      console.error('\t' + err.message);
      process.exit(0);
    }
    else {
      forwardChain(data.rules, data.facts, data.goal);

      // _.each(chain, function(rule) {
      //   console.log(rule.print().toString());
      // });

      // var tree = { children: [] };
      // var base = tree;
      // var child;
      // var Child = function(content, box) {
      //   this.content = content;
      //   this.box = box;
      //   this.children = [];
      // };
      // _.each(chain.reverse(), function(rule, i, chain) {
      //   child = new Child(rule.consequent, 'box');
      //   tree.children.push(child);
      //   tree = child;

      //   child = new Child('π' + rule.number, 'circle');
      //   tree.children.push(child);
      //   tree = child;

      //   _.each(rule.antecedents, function(antecedent) {
      //     console.log(chain[i].consequent);
      //     if(i === chain.length - 1) {
      //       child.children.push(new Child(antecedent, 'box'));
      //     }
      //     else if(chain[i + 1].consequent !== antecedent) {
      //       child.children.push(new Child(antecedent, 'box'));
      //     }
      //   });
      // });

      // console.log(JSON.stringify(base, null, 2));

      // var print = new Print(200, 200);
      // while(base.children.length) {
      //   var current = base.children.pop();
      // }

      // console.log(chain);
    }
  });
}
else if(opts.chaining === 'backward') {
  console.log('Not yet supported.');
}