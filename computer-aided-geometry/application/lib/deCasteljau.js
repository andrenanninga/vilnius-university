'use strict';

var _ = require('underscore');

var calculate = function(points, depth) {
  // don't calculate when we have less than 2 points
  if(points.length < 2) {
    return [];
  }

  while(depth > 0) {
    var _points = [];

    var subs = calculateSubdivision(_.clone(points));
    _points.push(subs[0]);
    _points.push(subs[1]);

    points = _.flatten(_points);

    depth -= 1;
  }

  return _.flatten(points);
};

var calculateSubdivision = function(points) {
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

module.exports = calculate;