var should = require('should');
var createRangeSet = require('../');

describe('range-set', function () {

  describe('insert', function () {

    it('should add the range to the set', function () {
      var r = createRangeSet();
      should.exist(r);
      r.insert(1, 4);
      r.array.should.have.length(1);
      r.array[0].should.have.property('begin', 1);
      r.array[0].should.have.property('end', 4);
    });

    it('should floor floats', function () {
      var r = createRangeSet();
      should.exist(r);
      r.insert(1.2, 4.9);
      r.array.should.have.length(1);
      r.array[0].should.have.property('begin', 1);
      r.array[0].should.have.property('end', 4);
    });

    it('should flip negative ranges', function () {
      var r = createRangeSet();
      should.exist(r);
      r.insert(4, 1);
      r.array.should.have.length(1);
      r.array[0].should.have.property('begin', 1);
      r.array[0].should.have.property('end', 4);
    });

    it('should not add invalid ranges', function () {
      var r = createRangeSet();
      should.exist(r);
      r.insert('x', 'y');
      r.array.should.have.length(0);
    });

    it('should add non-sequential ranges as separate objects', function () {
      var r = createRangeSet();
      should.exist(r);
      r.insert(1, 4);
      r.insert(8, 12);
      r.array.should.have.length(2);
      r.array[0].should.have.property('begin', 1);
      r.array[0].should.have.property('end', 4);
      r.array[1].should.have.property('begin', 8);
      r.array[1].should.have.property('end', 12);
    });

    it('should insert a lower range before a higher', function () {
      var r = createRangeSet();
      should.exist(r);
      r.insert(8, 12);
      r.insert(1, 4);
      r.array.should.have.length(2);
      r.array[0].should.have.property('begin', 1);
      r.array[0].should.have.property('end', 4);
      r.array[1].should.have.property('begin', 8);
      r.array[1].should.have.property('end', 12);
    });

    it('should maintain sort order', function () {
      var r = createRangeSet();
      should.exist(r);
      r.insert(1, 1);
      r.insert(5, 5);
      r.insert(3, 3);
      r.array.should.have.length(3);
      r.toString().should.eql('1,3,5');
    });

    it('should join overlapping ranges', function () {
      var r = createRangeSet();
      should.exist(r);
      r.insert(1, 8);
      r.insert(4, 12);
      r.array.should.have.length(1);
      r.toString().should.eql('1-12');
    });

    it('should join if a range is inserted adjacent to begin', function () {
      var r = createRangeSet();
      r.insert(8, 12);
      r.insert(4, 7);
      r.array.should.have.length(1);
      r.toString().should.eql('4-12');
    });

    it('should join if a range is inserted adjacent to end', function () {
      var r = createRangeSet();
      r.insert(4, 7);
      r.insert(8, 12);
      r.array.should.have.length(1);
      r.toString().should.eql('4-12');
    });

    it('should join multiple ranges', function () {
      var r = createRangeSet();
      r.insert(20, 22);
      r.insert(8, 10);
      r.toString().should.eql('8-10,20-22');
      r.insert(30, 40);
      r.toString().should.eql('8-10,20-22,30-40');
      r.insert(11, 29);
      r.toString().should.eql('8-40');
    });

    it('should join multiple ranges with larger range', function () {
      var r = createRangeSet();
      r.insert(1, 5);
      r.insert(20, 25);
      r.insert(30, 35);
      r.insert(40, 45);
      r.insert(90, 95);
      r.toString().should.eql('1-5,20-25,30-35,40-45,90-95');
      r.insert(10, 60);
      r.toString().should.eql('1-5,10-60,90-95');
    });

  });

  describe('remove', function () {

    it('should remove a range from the set');

    it('should remove multiple ranges from the set');

    it('should split a range');

  });

  describe('contains', function () {

    it('should return true if the set contains the int', function () {
      var r = createRangeSet();
      r.insert(1, 4);
      r.insert(8, 12);
      r.contains(1).should.be.true;
      r.contains(2).should.be.true;
      r.contains(4).should.be.true;
      r.contains(8).should.be.true;
      r.contains(10).should.be.true;
      r.contains(12).should.be.true;
    });

    it('should return false if the int is not found', function () {
      var r = createRangeSet();
      r.insert(1, 4);
      r.insert(8, 12);
      r.contains(0).should.be.false;
      r.contains(5).should.be.false;
      r.contains(7).should.be.false;
      r.contains(13).should.be.false;
    });

  });

  describe('intersects', function () {
    it('is pending');
  });

  describe('isSubsetOf', function () {
    it('is pending');
  });

  describe('isProperSubsetOf', function () {
    it('is pending');
  });

  describe('isSupersetOf', function () {
    it('is pending');
  });

  describe('isProperSupersetOf', function () {
    it('is pending');
  });

  describe('min', function () {

    it('should return the minimum value in the set', function () {
      var r = createRangeSet();
      r.insert(1, 4);
      r.insert(8, 12);
      var min = r.min();
      min.should.be.an.Number;
      min.should.eql(1);
    });

    it('should not return a number if the set is empty', function () {
      var r = createRangeSet();
      should.not.exist(r.min());
    });

  });

  describe('max', function () {

    it('should return the minimum value in the set', function () {
      var r = createRangeSet();
      r.insert(1, 4);
      r.insert(8, 12);
      var max = r.max();
      max.should.be.an.Number;
      max.should.eql(12);
    });

    it('should not return a number if the set is empty', function () {
      var r = createRangeSet();
      should.not.exist(r.max());
    });

  });

  describe('size', function () {

    it('should return the size of the range set', function () {
      var r = createRangeSet();
      r.insert(1, 4);
      r.insert(8, 12);
      var size = r.size();
      size.should.be.an.Number;
      size.should.eql(9);
    });

  });

  describe('forEach', function () {

    it('should invoke the function with each number in the range set', function () {
      var r = createRangeSet();
      r.insert(1, 4);
      r.insert(8, 12);
      var a = [];
      r.forEach(function (n) {
        a.push(n);
        arguments.should.have.length(1);
        this.should.equal(r);
      });
      a.should.eql([1, 2, 3, 4, 8, 9, 10, 11, 12]);
    });

    it('should take a second argument specifying context', function () {
      var r = createRangeSet();
      r.insert(1, 1);
      var ctx = 'context object';
      r.forEach(function (n) {
        n.should.eql(1);
        this.should.equal(ctx);
      }, ctx);
    });

  });

  describe('toArray', function () {

    it('should return an array containing all numbers in the range set', function () {
      var r = createRangeSet();
      should.exist(r);
      r.insert(1, 4);
      r.insert(8, 12);
      var a = r.toArray();
      should.exist(a);
      a.should.be.an.Array;
      a.should.eql([1, 2, 3, 4, 8, 9, 10, 11, 12]);
    });

  });

  describe('toString', function () {

    it('should format the range set', function () {
      var r = createRangeSet();
      r.insert(1, 4);
      r.insert(8, 12);
      r.toString().should.eql('1-4,8-12');
    });

  });

});
