'use strict';

var util = require('util');
var _ = require('underscore');

var forwardChain = function(rules, facts, goal) {
  var originalFacts = _.clone(facts);

  rules = rules.map(function(rule) { return rule.clone(); });

  console.log('facts:\t' + facts);
  console.log('rules:');
  _.each(rules, function(rule) { console.log('\t' + rule); });
  console.log('goal:\t' + goal);

  var finished = false;
  var iterations = 0;
  var path = [];

  while(!finished) {
    if(isGoalReached(facts, goal)) {
      console.log('\nsuccesfully found a path to goal: ' + goal);
      printPath(originalFacts, path);
      break;
    }

    iterations += 1;
    console.log('\n> iteration ' + iterations);
    console.log('facts: ' + facts + '\n');

    var isRuleApplied = false;

    for(var i = 0; i < rules.length; i += 1) {
      var rule = rules[i];

      if(isUseableRule(rule) && isMatchingRule(rule, facts)) {
        if(isUsefulRule(rule, facts)) {
          applyRule(rule, facts);
          path.push(rule);

          isRuleApplied = true;
          break;
        }
        else {
          disposeRule(rule);
        }
      }
    }

    if(!isRuleApplied) {
      console.log('\nfailed to find path to goal: ' + goal);
      console.log('facts: ' + facts);
      break;
    }
  }

  if(isGoalReached(facts, goal)) {
    return path;
  }
  else {
    return false;
  }
};

function isGoalReached(facts, goal) {
  return _.contains(facts, goal);
}

function isUseableRule(rule) {
  if(rule.applied) {
    console.log('rule "' + rule + '" was already used');
    return false;
  }
  else if(rule.useless) {
    console.log('rule "' + rule + '" was deemed useless');
    return false;
  }
  else {
    return true;
  }
}

function isMatchingRule(rule, facts) {
  // when the intersection of the antecedents and the facts is the same length
  // as the antecedents than all the antecedents are present in the facts
  if(_.intersection(rule.antecedents, facts).length === rule.antecedents.length) {
    return true;
  }
  else {
    console.log('rule "' + rule + '" does not match');
    return false;
  }
}

function isUsefulRule(rule, facts) {
  return !_.contains(facts, rule.consequent);
}

function applyRule(rule, facts) {
  console.log('rule "' + rule + '" is applied');

  rule.apply();

  facts.push(rule.consequent);
}

function disposeRule(rule) {
  console.log('rule "' + rule + '" is useless');

  rule.dispose();
}

function printPath(facts, path) {
  console.log();

  for(var i = 0; i < path.length; i += 1) {
    var rule = path[i];

    console.log('(' + facts + ')');
    console.log('    ↓');
    console.log(rule.toString());
    console.log('    ↓');

    facts.push(rule.consequent);
  }

  console.log('(' + facts + ')');
  console.log();
}

module.exports = forwardChain;