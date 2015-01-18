/*jshint loopfunc: true */

'use strict';

var _ = require('underscore');

_.mixin({
  // return true if every element in the array is false
  none: function(array) {
    return _.every(array, function(element) { 
      return element === false; 
    });
  }
});

var forwardChaining = function(rules, facts, goal) {
  var finished = false;
  var iterations = 0;
  var solution = [];

  while(!finished) {
    // check if the goal is present in the facts
    if(_.contains(facts, goal)) {
      console.log('goal is found');
      finished = true;
      break;
    }

    iterations += 1;

    // prevent infinite loops by setting an upper limit of iterations
    if(iterations > 100) {
      console.log('too many iterations');
      finished = true;
      break;
    }

    // loop over every rule and try to apply it
    // if it is succesfully applied it returns true otherwise it returns false
    var rulesApplied = _.map(rules, function(rule) {
      // check if the rule was already applied or was made redundant
      if(rule.applied || rule.redundant) {
        if(rule.applied) {
          console.log(iterations + ': skipped rule ' + rule.toString() + ' already applied');
        }
        else if(rule.redundant) {
          console.log(iterations + ': skipped rule ' + rule.toString() + ' is redundant');
        }
        return false;
      }

      // if the consequent of the rule is already in the facts then we can mark
      // it as redundant
      if(_.contains(facts, rule.consequent)) {
        rule.deprecate();
        return false;
      }

      // check if all the antecedents of the rule are present in the facts
      if(rule.match(facts)) {
        console.log(iterations + ': applied rule ' + rule.toString() + ' on ' + facts);

        // apply the rule
        rule.apply();
        solution.push(rule);
        facts.push(rule.consequent);

        return true;
      }

      return false;
    });

    // check if any rule was applied
    // if no rule was applied then we cannot find a solution to the goal
    if(_.none(rulesApplied)) {
      console.log('failed to find a solution');
      solution = [];
      finished = true;
      break;
    }
  }

  return solution;
};

module.exports = forwardChaining;