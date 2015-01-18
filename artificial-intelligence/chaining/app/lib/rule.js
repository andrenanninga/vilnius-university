'use strict';

var _ = require('underscore');
var amount = 0;

var Rule = function(antecedents, consequent, number) {
  // the antecedents are the facts needed before this rule can be applied
  this.antecedents = antecedents;
  // the consequent is the new fact that is available when this rule is applied
  this.consequent = consequent;
  // the number is used for identifying
  this.number = number || ++amount;

  this.applied = false;
  this.redundant = false;
};

Rule.prototype.clone = function() {
  return new Rule(this.antecedents, this.consequent, this.number);
};

Rule.prototype.reset = function() {
  this.applied = false;
  this.redundant = false;
};

Rule.prototype.deprecate = function() {
  this.redundant = true;
};

Rule.prototype.apply = function() {
  this.applied = true;
};

Rule.prototype.match = function(facts) {
  // if the intersection of the antecedents and the facts is the same length 
  // as the antecedents then all antecedents are present in the facts and thus
  // this rule matches
  var intersect = _.intersection(this.antecedents, facts);

  return intersect.length === this.antecedents.length;
};

Rule.prototype.getNumber = function() {
  return '[π' + this.number + ']';
};

Rule.prototype.toString = function() {
  return this.getNumber() + ' ' + this.antecedents.join(', ') + ' → ' + this.consequent;
};

module.exports = Rule;