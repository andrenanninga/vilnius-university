'use strict';

var chai = require('chai');
chai.use(require('chai-things'));

var Code = require('../lib/code');
var Word = require('../lib/word');

describe('code', function() {
  describe('.set()', function() {
    it('should set the words correctly when given as arguments', function() {
      var code = new Code('100', '010', '100');

      chai.expect(code).to.have.a.property('words');
      chai.expect(code.words).to.all.be.instanceof(Word);
    });

    it('should set the words correctly when given as an array', function() {
      var code = new Code(['100', '010', '100']);

      chai.expect(code).to.have.a.property('words');
      chai.expect(code.words).to.all.be.instanceof(Word);
    });

    it('should set the words correctly when given as an array of Words', function() {
      var code = new Code([new Word('100'), new Word('010'), new Word('100')]);

      chai.expect(code).to.have.a.property('words');
      chai.expect(code.words).to.all.be.instanceof(Word);
    });

    it('should allow empty code', function() {
      var code = new Code();

      chai.expect(code).to.have.a.property('words');
      chai.expect(code.words).to.all.be.instanceof(Word);
      chai.expect(code.words.length).to.equal(0);
    });
  });

  describe('.getInformationRate()', function() {
    it('should correctly calculate the information rate', function() {
      var code = new Code('0000', '0011', '0101', '0110', '1001', '1010', '1100', '1111');

      chai.expect(code.getInformationRate()).to.be.equal(3/4);
    });

    it('should return 0 for an empty code', function() {
      var code = new Code();

      chai.expect(code.getInformationRate()).to.be.equal(0);
    });
  });

  describe('.isLinear()', function() {
    it('should correctly determine that a code is linear', function() {
      chai.expect(new Code('000', '001', '010', '011').isLinear()).to.equal(true);
      chai.expect(new Code('0000', '0001', '1110').isLinear()).to.equal(false);
      chai.expect(new Code('00000', '11110', '01111', '10001').isLinear()).to.equal(true);
      chai.expect(new Code('000000', '101010', '010101', '111111').isLinear()).to.equal(true);
    });
  });

  describe('.distance()', function() {
    it('should correctly calculate the distance of a code', function() {
      chai.expect(new Code('000', '001', '010', '011').getDistance()).to.equal(1);
      chai.expect(new Code('0000', '0001', '1110').getDistance()).to.equal(1);
      chai.expect(new Code('00000', '11110', '01111', '10001').getDistance()).to.equal(2);
      chai.expect(new Code('000000', '101010', '010101', '111111').getDistance()).to.equal(3);
    });
  });
});