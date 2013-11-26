module.exports = createRange;

function createRange(begin, end) {
  if (isFinite(begin) && isFinite(end)) {
    begin = + begin | 0;
    end   = + end   | 0;
    if (begin > end) {
      var tmp = begin;
      begin = end;
      end = tmp;
    }
    return new Range(begin, end);
  }
  return null;
}

function Range(begin, end) {
  this.begin = begin;
  this.end = end;
}

// contains an int
Range.prototype.contains = function (n) {
  return this.begin <= n && n <= this.end;
};

// Returns the number of elements in the range
Range.prototype.size = function () {
  return this.end - this.begin + 1;
};

Range.prototype.toArray = function () {
  var result = [], i = this.begin, end = this.end;
  for (; i <= end; i++) {
    result.push(i);
  }
  return result;
};

Range.prototype.toString = function () {
  if (this.begin === this.end) {
    return this.begin.toString();
  }
  return this.begin + '-' + this.end;
};
