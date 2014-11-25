'use strict';

var chai = require('chai');
chai.use(require('chai-things'));

var Word = require('../lib/word');

describe('word', function() {
  describe('.set()', function() {
    it('should set the value and length', function() {
      var word = new Word('001');

      chai.expect(word.length).to.equal(3);
      chai.expect(word.value).to.equal('001');
    });

    it('shouldn\'t allow empty words', function() {
      var word = new Word('111');

      chai.expect(word.set.bind(word)).to.throw('value required');
    });
  });

  describe('.add()', function() {
    it('should correctly add words together', function() {
      chai.expect(new Word('0011').add(new Word('1100')).value).to.equal('1111');
      chai.expect(new Word('0011').add(new Word('1111')).value).to.equal('1100');
      chai.expect(new Word('0000').add(new Word('1111')).value).to.equal('1111');
    });

    it('should throw an error when the two words are of different length', function() {
      var word1 = new Word('101001');
      var word2 = new Word('11010');

      chai.expect(word1.add.bind(word1, word2)).to.throw('words must be same length');
    });
  });

  describe('.cross()', function() {
    it('should correctly cross two words', function() {
      chai.expect(new Word('0011').cross(new Word('1100')).value).to.equal('0000');
      chai.expect(new Word('0011').cross(new Word('1111')).value).to.equal('0011');
      chai.expect(new Word('0000').cross(new Word('1111')).value).to.equal('0000');
      chai.expect(new Word('1101').cross(new Word('0111')).value).to.equal('0101');
    });

    it('should throw an error when the two words are of different length', function() {
      var word1 = new Word('101001');
      var word2 = new Word('11010');

      chai.expect(word1.cross.bind(word1, word2)).to.throw('words must be same length');
    });
  });

  describe('.distance()', function() {
    it('should correctly calculate the distance between two words', function() {
      var word1 = new Word('101001');
      var word2 = new Word('110101');

      chai.expect(word1.distance(word2)).to.equal(3);
    });

    it('should throw an error when the two words are of different length', function() {
      var word1 = new Word('101001');
      var word2 = new Word('11011');

      chai.expect(word1.distance.bind(word1, word2)).to.throw('words must be same length');
    });
  });

  describe('.getWeight()', function() {
    it('should correctly calculate the weight', function() {
      var word = new Word('00111');

      chai.expect(word.getWeight()).to.equal(3);
    });
  });
});