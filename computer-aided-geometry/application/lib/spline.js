'use strict';

var _ = require('underscore');

var calculate = function(points, depth, closed) {
  // don't calculate when we have less than 2 points
  if(points.length < 2) {
    return [];
  }

  if(closed) {
    points.push(points[0]);  
    points.push(points[1]);  
  }
  else {
    var pointBefore = {
      x: points[0].x - (points[1].x - points[0].x),
      y: points[0].y - (points[1].y - points[0].y)
    };

    var pointAfter = {
      x: points[points.length - 1].x - (points[points.length - 2].x - points[points.length - 1].x),
      y: points[points.length - 1].y - (points[points.length - 2].y - points[points.length - 1].y)
    };

    points = points.splice(1, points.length - 2);
    points.unshift(pointBefore);
    points.push(pointAfter);
  }

  var parts = calculateParts(points);

  while(depth > 0) {
    var _parts = [];
    for(var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var subs = calculateSubdivision(part.slice(0));
      _parts.push(subs[0]);
      _parts.push(subs[1]);
    }

    parts = _parts;

    depth -= 1;
  }

  return _.flatten(parts);
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

var calculateParts = function(points) {
  var parts = [];

  for(var i = 1; i < points.length - 1; i++) {
    var point0 = _.clone(points[i - 1]);
    var point1 = _.clone(points[i]);
    var point2 = _.clone(points[i + 1]);

    parts.push([
      {
        x: (point0.x + point1.x) / 2,
        y: (point0.y + point1.y) / 2,
      },
      point1,
      {
        x: (point1.x + point2.x) / 2,
        y: (point1.y + point2.y) / 2,
      }
    ]);
  }

  return parts;
};

module.exports = calculate;