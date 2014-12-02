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
  this.result = [];
  this.solver(goal);

  if(_.contains(this.facts, goal)) {
    return [];
  }
  
  if(this.result.length) {
    return this.result;
  }
  else {
    return false;
  }

  util.print('\n');
};

BackwardChain.prototype.solver = function(goal) {
  this.depth += 1;

  var pad = tab(this.depth);
  var ruleUsed = false;

  util.print(pad + goal + ' - ');

  if(_.contains(this.allFacts, goal)) {
    if(_.contains(this.facts, goal)) {
      util.print('facts\n');
    }
    else {
      util.print('previous\n');
    }

    this.depth -= 1;
    return true;
  }

  if(_.contains(this.searchFacts, goal)) {
    util.print('loop\n');
    this.depth -= 1;
    return false;
  }

  this.searchFacts.push(goal);

  for(var i = 0; i < this.rules.length; i++) {
    var rule = this.rules[i];
    var branches = [];

    if(rule.applied || rule.useless) {
      continue;
    }

    // console.log(pad + goal);
    // console.log(pad + this.allFacts + ' - ' + this.searchFacts);
    // console.log(pad + rule.toString());
    // console.log();

    if(rule.consequent === goal) {
      ruleUsed = true;
      util.print(rule.toString() + '\n');

      for(var j = 0; j < rule.antecedents.length; j++) {
        var antecedent = rule.antecedents[j];
        branches.push(this.solver(antecedent));
      }

      if(_.every(branches)) {
        if(_.intersection(rule.antecedents, this.allFacts).length === rule.antecedents.length) {
          this.searchFacts = _.without(this.searchFacts, goal);
          this.allFacts.push(rule.consequent);
          this.result.push(rule);
          rule.apply();
          this.depth -= 1;

          return true;
        }
      }
      else {
        // rule fail
        util.print('fail\n');
      }
    }
  }

  if(!ruleUsed) {
    // deadend
    util.print('deadend\n');
  }

  this.searchFacts = _.without(this.searchFacts, goal);
  this.depth -= 1;

  return false;
};

var tab = function(amount) {
  return new Array(amount + 1).join('  ');
};

module.exports = BackwardChain;