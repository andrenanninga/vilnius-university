'use strict';

var _ = require('underscore');

var backwardChain = function(rules, facts, goal) {
  var originalFacts = _.clone(facts);

  rules = rules.map(function(rule) { return rule.clone(); });
};

module.exports = backwardChain;