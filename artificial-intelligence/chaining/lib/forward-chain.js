'use strict';

var _ = require('underscore');

var forwardChain = function(rules, facts, goal) {
  rules = rules.map(function(rule) {
    return rule.clone();
  });

  console.log(rules);
  console.log(facts);
  console.log(goal);

  var finished = false;

  while(!finished) {
    if(_.contains(facts, goal)) {
      console.log('success');
      finished = true;
      break;
    }
  }
};

module.exports = forwardChain;