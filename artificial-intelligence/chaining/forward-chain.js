'use strict';

var ForwardChain = function(rules) {
  this.rules = rules;
};

ForwardChain.prototype.solve = function(facts, goal) {
  var rules = this.rules.splice(0);
  var success = false;
  var failed = false;

  while(!success && !failed) {
    if(facts.indexOf(goal) !== -1) {
      console.log('success');

      success = true;
      break;
    }

    var appliedRule = false;

    for(var i = 0; i < rules.length; i += 1) {
      var rule = rules[i];

      if(rule.used || rule.unnecessary) {
        continue;
      }

      var applyRule = true;

      for(var j = 0; j < rule.antecedents.length; j += 1) {
        var antecedent = rule.antecedents[j];

        if(facts.indexOf(antecedent) === -1) {
          applyRule = false;
        }
      }

      if(applyRule) {
        if(facts.indexOf(rule.consequent) === -1) {
          facts.push(rule.consequent);
          rule.used = true;
          appliedRule = true;

          console.log('using rule', i, rule, facts);
        }
        else {
          rule.unnecessary = true;

          console.log('unnecessary rule', i, rule, facts);
        }
      }
    }

    if(!appliedRule) {
      console.log('failed');

      failed = true;
      break;
    }
  }

  console.log(facts);
  console.log(rules);
};

module.exports = ForwardChain;