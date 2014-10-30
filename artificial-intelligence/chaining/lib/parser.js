'use strict';

var fs = require('fs');
var _ = require('underscore');
var Rule = require('./rule');

var states = {
  'NONE': -1,
  'RULES': 1,
  'FACTS': 2,
  'GOAL': 3
};

var rulesRegex = /rules/i;
var factsRegex = /facts/i;
var goalRegex = /goal/i;
var lettersRegex = /([A-Z])/g;

var parse = function(file, cb) {
  var state = states.NONE;
  var result = {};

  fs.readFile(file, function(err, data) {
    if(err) {
      return cb(err);
    }

    var lines = data.toString().split(/\r?\n/);

    for(var i = 0; i < lines.length; i += 1) {
      var line = lines[i];

      if(line === '') {
        state = states.NONE;
        continue;
      }

      if(rulesRegex.test(line) && state === states.NONE) {
        state = states.RULES;
        result.rules = [];
        continue;
      }
      else if(factsRegex.test(line) && state === states.NONE) {
        state = states.FACTS;
        continue;
      }
      else if(goalRegex.test(line) && state === states.NONE) {
        state = states.GOAL;
        continue;
      }

      try {
        if(state === states.RULES) {
          result.rules.push(parseRule(i, line));
        }
        else if(state === states.FACTS) {
          result.facts = parseFacts(i, line);
        }
        else if(state === states.GOAL) {
          result.goal = parseGoal(i, line);
        }
      }
      catch(err) {
        return cb(err);
      }
    }

    err = checkResult(result);

    if(err) {
      cb(err);
    }
    else {
      cb(null, result);
    }
  });
};

var parseRule = function(lineNum, line) {
  var letters = line.match(lettersRegex);
  var antecedents = [];
  var consequent;

  if(letters.length < 2) {
    throw new Error('invalid rule on line ' + lineNum + ': \"' + line + '\"');
  }

  for(var j = 0; j < letters.length; j += 1) {
    var letter = letters[j];

    if(j === 0) {
      consequent = letter;
    }
    else {
      antecedents.push(letter);
    }
  }

  return new Rule(antecedents, consequent);
};

var parseFacts = function(lineNum, line) {
  var letters = line.match(lettersRegex);

  return letters;
};

var parseGoal = function(lineNum, line) {
  var letters = line.match(lettersRegex);

  if(letters.length > 1) {
    throw new Error('invalid goal on line ' + lineNum + ': \"' + line + '\"');
  }

  return letters[0];
};

var checkResult = function(result) {
  if(!_.isObject(result)) {
    return new Error('internal error');
  }

  if(!_.isArray(result.rules)) {
    return new Error('no rules found');
  }

  if(!_.isArray(result.facts)) {
    return new Error('no facts found');
  }

  if(!_.isString(result.goal)) {
    return new Error('no goal found');
  }
};

module.exports = parse;