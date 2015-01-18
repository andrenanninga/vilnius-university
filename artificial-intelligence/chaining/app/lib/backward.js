'use strict';

var _ = require('underscore');
var util = require('util');

var BackwardChain = function(rules, facts, goal) {
  this.rules = rules;
  this.facts = facts;
  this.goal = goal;

  this.allFacts = _.clone(facts);
  this.searchFacts = [];

  this.depth = -1;
  this.solution = [];
  this.solution = _.flatten(this.solver(goal, []));

  // check if the goal is in the given facts
  if(_.contains(this.facts, goal)) {
    return [];
  }
  
  // check if the solver found a solution
  if(this.solution.length) {
    return this.solution;
  }
  else {
    console.log('failed to find solution');
    return [];
  }

  util.print('\n');
};

BackwardChain.prototype.solver = function(goal, solution) {
  this.depth += 1;

  var ruleUsed = false;

  // we want to represent the depth with tabs
  var pad = tab(this.depth);
  var goalText = pad + 'goal is ' + goal + '. ';

  // check if the goal is already present
  if(_.contains(this.allFacts, goal)) {
    if(_.contains(this.facts, goal)) {
      util.print(goalText + 'goal is in the original facts.\n');
    }
    else {
      util.print(goalText + 'goal was previously deduced.\n');
    }

    this.depth -= 1;
    return true;
  }

  // check if the goal is already derived thus causing a loop
  if(_.contains(this.searchFacts, goal)) {
    util.print(goalText + 'Was already used to derive, leads to a loop.\n');
    this.depth -= 1;
    return false;
  }

  // add the goal to searchFacts
  this.searchFacts.push(goal);

  // loop through all rules
  for(var i = 0; i < this.rules.length; i++) {
    var rule = this.rules[i];
    var branches = [];

    // check if the rule was already applied or was made redundant
    if(rule.applied || rule.redundant) {
      continue;
    }

    // check if the rule has the current goal as the consequent
    if(rule.consequent === goal) {
      ruleUsed = true;
      util.print(goalText + 'Trying ' + rule.toString() + ' | trying to derive ' + rule.antecedents + '.\n');
      var sol = _.clone(solution);

      // for every antecedent we recursivly try to derive
      for(var j = 0; j < rule.antecedents.length; j++) {
        var antecedent = rule.antecedents[j];
        branches.push(this.solver(antecedent, sol));
      }

      // if every antecedent could be derived then we can add it to our solution
      if(_.every(branches)) {
        if(_.intersection(rule.antecedents, this.allFacts).length === rule.antecedents.length) {
          this.searchFacts = _.without(this.searchFacts, goal);
          this.allFacts.push(rule.consequent);
          // this.solution.push(rule);
          rule.apply();
          this.depth -= 1;

          sol.push(rule);
          solution.push(sol);
          return solution;
        }
      }
    }
  }

  // when no rule was applicable then we reach a deadend 
  if(!ruleUsed) {
    // deadend
    util.print(goalText + 'no possible rule available, deadend.\n');
  }

  this.searchFacts = _.without(this.searchFacts, goal);
  this.depth -= 1;

  return false;
};

var tab = function(amount) {
  return new Array(amount + 1).join('  ');
};

module.exports = function(rules, facts, goal) {
  return new BackwardChain(rules, facts, goal);
};