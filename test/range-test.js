var should = require('should');
var createRange = require('../range.js');

describe('range', function () {

  describe('contains', function () {

    it('should return true if the range contains the int', function () {
      var r = createRange(1, 4);
      r.contains(1).should.be.true;
      r.contains(2).should.be.true;
      r.contains(4).should.be.true;
    });

    it('should return false if the int is not found', function () {
      var r = createRange(1, 4);
      r.contains(0).should.be.false;
      r.contains(5).should.be.false;
    });

  });

  describe('size', function () {

    it('should return the size of the range', function () {
      var r = createRange(1, 4);
      var size = r.size();
      size.should.be.an.Number;
      size.should.eql(4);
    });

  });

  describe('toArray', function () {

    it('should return an array containing all numbers in the range', function () {
      var r = createRange(1, 4);
      should.exist(r);
      var a = r.toArray();
      should.exist(a);
      a.should.be.an.Array;
      a.should.eql([1, 2, 3, 4]);
    });

  });

  describe('toString', function () {

    it('should format the range', function () {
      createRange(1, 4).toString().should.eql('1-4');
    });

    it('should format the range of length 1', function () {
      createRange(1, 1).toString().should.eql('1');
    });

  });

});
