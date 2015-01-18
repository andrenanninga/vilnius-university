'use strict';

var fs = require('fs');
var _ = require('underscore');
var Rule = require('./rule');

var patterns = {
  rules: /rules/i,
  facts: /facts/i,
  goal: /goal/i,
  letters: /([A-Z])/g,
  comment: /\/\/.*$/g,
  newLine: /\r?\n/,
  trim: /^\s+|\s+$/g
};

_.mixin({
  // split text into lines
  splitLines: function(text) {
    return text.split(patterns.newLine);
  },

  // remove all text behind '//' for every line
  removeComments: function(text) {
    return _.map(text, function(line) {
      return line.replace(patterns.comment, '');
    });
  },

  // remove all trailing and leading spaces for every line
  trim: function(text) {
    return _.map(text, function(line) {
      return line.replace(patterns.trim, '');
    });
  },

  // get the index of an element based on regex
  indexOfRegex: function(array, regex) {
    return _.reduce(array, function(memo, element, index) { 
      if(element.match(regex)) { 
        return index; 
      }
      return memo;
    }, undefined);
  }
});

var parse = function(file, cb) {
  fs.readFile(file, function(err, data) {
    if(err) {
      return cb(err);
    }

    var lines = getLines(data.toString());
    var blocks = getBlocks(lines);

    try {
      blocks.rules = _.map(blocks.rules, parseRule);
      blocks.facts = _.map(blocks.facts, parseFacts)[0];
      blocks.goal = _.map(blocks.goal, parseGoal)[0];
      
      checkResult(blocks);
    }
    catch(err) {
      return cb(err);
    }

    return cb(null, blocks);
  });
};

var getLines = function(contents) {
  return _.chain(contents)
    .splitLines()     // split the file into lines
    .removeComments() // remove all comments
    .compact()        // remove empty lines
    .trim()           // remove whitespace before and after each line
    .value();
};

var getBlocks = function(lines) {
  var headers, blocks;
  var end;

  // get the line number of each header
  headers = [
    { name: 'facts', index: _.indexOfRegex(lines, patterns.facts) },
    { name: 'rules', index: _.indexOfRegex(lines, patterns.rules) },
    { name: 'goal', index: _.indexOfRegex(lines, patterns.goal) },
  ];

  // sort the headers backwards
  headers = _.sortBy(headers, function(header) { return -header.index; } );

  // starting from the end we get each block of facts, rules and goal
  end = lines.length;
  blocks = _.map(headers, function(header) {
    var block = lines.slice(header.index + 1, end);
    end = header.index;

    return block;
  });

  // transform array into object
  blocks = _.object(_.pluck(headers, 'name'), blocks);

  return blocks;
};

var parseRule = function(line) {
  var letters = line.match(patterns.letters);
  var antecedents = [];
  var consequent;

  if(letters.length < 2) {
    throw new Error('invalid rule: \"' + line + '\"');
  }

  consequent = letters[0];
  antecedents = letters.splice(1);

  return new Rule(antecedents, consequent);
};

var parseFacts = function(line) {
  var letters = line.match(patterns.letters);

  return letters;
};

var parseGoal = function(line) {
  var letters = line.match(patterns.letters);

  if(letters.length > 1) {
    throw new Error('invalid goal: \"' + line + '\"');
  }

  return letters[0];
};

var checkResult = function(result) {
  if(!_.isObject(result)) {
    throw new Error('internal error');
  }

  if(!_.isArray(result.rules) || _.isEmpty(result.rules)) {
    throw new Error('no rules found');
  }

  if(!_.isArray(result.facts) || _.isEmpty(result.facts)) {
    throw new Error('no facts found');
  }

  if(!_.isString(result.goal) || _.isEmpty(result.goal)) {
    throw new Error('no goal found');
  }
};

module.exports = parse;