var createRange = require('./range.js');

module.exports = createRangeSet;

function createRangeSet() {
  return new RangeSet();
}

function RangeSet() {
  this.array = [];
}

function _compare(a, b) {
  if ((a.end + 1) < b.begin) {
    return -1;
  }
  if ((a.begin - 1) > b.end) {
    return 1;
  }
  return 0;
}

// insert a range
RangeSet.prototype.insert = function (begin, end) {
  var r = createRange(begin, end);
  if (!r) {
    return;
  }

  if (!this.array.length || r.begin - 1 > this.array[this.array.length - 1].end) {
    this.array.push(r);
    return;
  }

  var i, c, start = -1, stop = -1;
  for (i = 0; i < this.array.length; i++) {
    c = _compare(this.array[i], r);

    if (stop >= 0 && c > 0) {
      // stop has index and we past the last intersecting range
      break;
    }

    if (c === 0) {
      // range is intersecting
      if (start < 0) {
        // the first intersecting range
        start = i;
      }
      stop = i + 1;
    }

    if (stop < 0 && c > 0) {
      // no overlapping, insert it
      this.array.splice(i, 0, r);
      return;
    }
  }

  begin = Math.min(this.array[start].begin, r.begin);
  end = Math.max(this.array[stop - 1].end, r.end);
  r = createRange(begin, end);
  this.array.splice(start, stop - start, r);
};

// remove a range
RangeSet.prototype.remove = function () {};

// contains an int
RangeSet.prototype.contains = function (n) {
  var a = this.array, l = a.length, i = 0;
  n = n | 0;
  for (; i < l && a[i].begin <= n; i++) {
    if (n <= a[i].end) {
      return true;
    }
  }
  return false;
};

// true if this intersects a range
RangeSet.prototype.intersects = function () {};

RangeSet.prototype.isSubsetOf = function () {};

RangeSet.prototype.isProperSubsetOf = function () {};

RangeSet.prototype.isSupersetOf = function () {};

RangeSet.prototype.isProperSupersetOf = function () {};

// Returns the minimum value in the set
RangeSet.prototype.min = function () {
  if (this.array.length) {
    return this.array[0].begin;
  }
};

// Returns the maximum value in the set
RangeSet.prototype.max = function () {
  if (this.array.length) {
    return this.array[this.array.length - 1].end;
  }
};

// Returns the number of elements in the set
RangeSet.prototype.size = function () {
  var result = 0, i = 0;
  for (; i < this.array.length; i++) {
    result += this.array[i].size();
  }
  return result;
};

RangeSet.prototype.forEach = function (fn, ctx) {
  var a = this.array, l = a.length, i = 0, r, j, end;
  for (; i < l; i++) {
    for (r = a[i], j = r.begin, end = r.end; j <= end; j++) {
      fn.call(ctx || this, j);
    }
  }
};

RangeSet.prototype.toArray = function () {
  var result = [], a = this.array, l = a.length, i = 0, r, j, end;
  for (; i < l; i++) {
    for (r = a[i], j = r.begin, end = r.end; j <= end; j++) {
      result.push(j);
    }
  }
  return result;
};

RangeSet.prototype.toString = function () {
  return this.array.join(',');
};

