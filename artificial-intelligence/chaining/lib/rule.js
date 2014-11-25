'use strict';

var Print = require('./print');

var Rule = function(antecedents, consequent, number) {
  this.antecedents = antecedents;
  this.consequent = consequent;
  this.number = number;

  this.applied = false;
  this.useless = false;
};

Rule.prototype.clone = function() {
  return new Rule(this.antecedents, this.consequent, this.number);
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

Rule.prototype.print = function() {
  var height = this.antecedents.length * 4 - 1;

  var print = new Print(21, height);

  var rulePosition = { 
    x: 8, 
    y: Math.round(height / 2) - 2
  };

  var consequentPosition = {
    x: 17,
    y: Math.round(height / 2) - 2
  };

  for(var i = 0; i < this.antecedents.length; i++) {
    var antecedent = this.antecedents[i];
    print.line(
      { x: 0 + 1, y: i * 4 + 1 }, 
      { x: rulePosition.x + 2, y: rulePosition.y + 1 }
    );
    print.box(antecedent, 0, i * 4);
  }

  print.line(
    { x: rulePosition.x + 2, y: rulePosition.y + 1 },
    { x: consequentPosition.x + 2, y: consequentPosition.y + 1}
  );
  print.circle('π' + this.number, rulePosition.x, rulePosition.y);
  print.box(this.consequent, consequentPosition.x, consequentPosition.y);

  return print;
};

Rule.prototype.toString = function() {
  return '[π' + this.number + '] ' + this.antecedents.join(', ') + ' → ' + this.consequent;
};

module.exports = Rule;