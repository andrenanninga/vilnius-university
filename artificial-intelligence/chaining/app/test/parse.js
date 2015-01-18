/* jshint expr:true */

'use strict';

var should = require('should');
var parse = require('../lib/parser');
var Rule = require('../lib/rule');

describe('parse', function() {
  it('should parse the basic rules', function(done) {
    parse('./chains/basic.chain', function(err, data) {
      should.not.exist(err);

      data.goal.should.equal('Z');
      data.facts.should.eql(['A', 'B', 'C']);
      data.rules.should.have.length(3);

      data.rules[0].should.be.an.instanceOf(Rule);
      data.rules[1].should.be.an.instanceOf(Rule);
      data.rules[1].should.be.an.instanceOf(Rule);

      data.rules[0].antecedents.should.eql(['F', 'B']);
      data.rules[0].consequent.should.equal('Z');
      
      data.rules[1].antecedents.should.eql(['C', 'D']);
      data.rules[1].consequent.should.equal('F');
      
      data.rules[2].antecedents.should.eql(['A']);
      data.rules[2].consequent.should.equal('D');
      
      done();
    });
  });

  it('should throw an error when no goal is present', function(done) {
    parse('./chains/no-goal.chain', function(err, data) {
      should.not.exist(data);

      err.should.be.an.instanceOf(Error);
      err.should.eql(new Error('no goal found'));

      done();
    });
  });

  it('should throw an error when no rules are present', function(done) {
    parse('./chains/no-rules.chain', function(err, data) {
      should.not.exist(data);

      err.should.be.an.instanceOf(Error);
      err.should.eql(new Error('no rules found'));

      done();
    });
  });

  it('should throw an error when no facts are present', function(done) {
    parse('./chains/no-facts.chain', function(err, data) {
      should.not.exist(data);

      err.should.be.an.instanceOf(Error);
      err.should.eql(new Error('no facts found'));

      done();
    });
  });

  it('should throw an error when an invalid rule is present', function(done) {
    parse('./chains/invalid-rule.chain', function(err, data) {
      should.not.exist(data);

      err.should.be.an.instanceOf(Error);
      err.should.eql(new Error('invalid rule: "D"'));

      done();
    });
  });

  it('should throw an error when an invalid goal is present', function(done) {
    parse('./chains/invalid-goal.chain', function(err, data) {
      should.not.exist(data);

      err.should.be.an.instanceOf(Error);
      err.should.eql(new Error('invalid goal: "Z D"'));

      done();
    });
  });

});