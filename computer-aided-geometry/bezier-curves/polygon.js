/* jshint node: true */

'use strict';

var Polygon = function() {
  this.points = Array.prototype.slice.call(arguments, 0);
};

Polygon.prototype.draw = function(context) {
  context.save();

  for(var i = 0; i < this.points.length; i++) {
    var point = this.points[i];

    context.lineTo(point.x, point.y);
    context.fillRect(point.x - 2, point.y - 2, 4, 4);
  }

  context.restore();
};

Polygon.prototype.push = function(point) {
  this.points.push(point);
};

module.exports = Polygon;