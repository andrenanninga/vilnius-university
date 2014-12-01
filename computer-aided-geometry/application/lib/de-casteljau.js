'use strict';

var _ = require('underscore');

var DeCasteljau = function(context, points, closed) {
  this.context = context;
  this.points = points;
  this.closed = closed || false;
  this.depth = 5;
  this.color = '#4EB379';
  this.visible = true;

  this.polygon = points;

  this.calculate();
};


DeCasteljau.prototype.calculate = function() {
  if(!this.visible) {
    return;
  }

  var points = this.points.slice(0);
  var parts = [points];
  var depth = this.depth;

  while(depth > 0) {
    var _parts = [];
    for(var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var subs = this._calculateSubdivision(part.slice(0));
      _parts.push(subs[0]);
      _parts.push(subs[1]);
    }

    parts = _parts;

    depth -= 1;
  }

  this.polygon = _.flatten(parts);
};

DeCasteljau.prototype._calculateSubdivision = function(points) {
  var right = [];
  var left = [];

  while(points.length > 1) {
    var midpoints = [];
    
    for(var i = 0; i < points.length - 1; i += 1) {
      var point0 = points[i];
      var point1 = points[i + 1];

      var midpoint = {
        x: point0.x * (1 - 0.5) + point1.x * (0.5),
        y: point0.y * (1 - 0.5) + point1.y * (0.5),
      };

      midpoints.push(midpoint);

      if(i === 0) {
        right.push(point0);
      }
      if(i === points.length - 2) {
        left.push(point1);
      }
    }

    points = midpoints.slice(0);
  }

  right.push(points[0]);
  left.push(points[0]);
  left.reverse();

  return [right, left];
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