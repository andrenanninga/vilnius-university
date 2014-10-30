'use strict';

var Rule = function(antecedents, consequent) {
  this.antecedents = antecedents;
  this.consequent = consequent;

  this.applied = false;
  this.ignored = false;
};

Rule.prototype.clone = function() {
  return new Rule(this.antecedents, this.consequent);
};

Rule.prototype.reset = function() {
  this.applied = false;
  this.ignored = false;
};

Rule.prototype.ignore = function() {
  this.ignored = true;
};

Rule.prototype.apply = function() {
  this.applied = true;
};

module.exports = Rule;