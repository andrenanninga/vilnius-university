'use strict';

var DeCasteljau = function(context, points, closed) {
  this.context = context;
  this.points = points;
  this.closed = closed || true;
  this.precision = 50;
  this.color = '#4EB379';
  this.visible = true;

  this.polygon = points;

  this.calculate();
};

DeCasteljau.prototype.calculate = function() {
  var points = this.points.slice(0);
  var _points = [];

  for(var i = 0; i <= this.precision; i += 1) {
    var t = i / this.precision;

    var midpoint = this._calculateMidPoint(points.slice(0), t);

    _points.push(midpoint);
  }

  this.polygon = _points;
};

DeCasteljau.prototype._calculateMidPoint = function(points, t) {
  while(points.length > 1) {
    var midpoints = [];
    
    for(var i = 0; i < points.length - 1; i += 1) {
      var point0 = points[i];
      var point1 = points[i + 1];

      var midpoint = {
        x: point0.x * (1 - t) + point1.x * (t),
        y: point0.y * (1 - t) + point1.y * (t),
      };

      midpoints.push(midpoint);
    }

    points = midpoints.slice(0);
  }

  return points[0];
};

DeCasteljau.prototype.draw = function() {
  if(!this.visible) {
    return;
  }

  this.context.save();

  this.context.beginPath();
  this.context.strokeStyle = this.color;
  this.context.lineWidth = 2;

  this.context.moveTo(this.polygon[0].x, this.polygon[0].y);

  for(var j = 1; j < this.polygon.length; j += 1){
    var point = this.polygon[j];

    this.context.lineTo(point.x, point.y);
  }

  if(this.closed) {
    this.context.lineTo(this.polygon[0].x, this.polygon[0].y);
  }

  this.context.stroke();

  this.context.restore();
};

module.exports = DeCasteljau;