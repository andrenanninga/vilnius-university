'use strict';

var Rule = function(antecedents, consequent) {
  this.antecedents = antecedents;
  this.consequent = consequent;

  this.applied = false;
  this.useless = false;
};

Rule.prototype.clone = function() {
  return new Rule(this.antecedents, this.consequent);
};

Rule.prototype.reset = function() {
  this.applied = false;
  this.useless = false;
};

Rule.prototype.dispose = function() {
  this.useless = true;
};

Rule.prototype.apply = function() {
  this.applied = true;
};

Rule.prototype.toString = function() {
  return this.antecedents.join(', ') + ' -> ' + this.consequent;
};

module.exports = Rule;