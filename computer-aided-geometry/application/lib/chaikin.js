'use strict';

var _ = require('underscore');

var calculate = function(points, depth, closed) {
  // don't calculate when we have less than 2 points
  if(points.length < 2) {
    return [];
  }

  // iterate over the points and calculate the point 1/4 and 3/4 between n and
  // n+1. During the next ireration use these new points and apply the same 
  // algorithm.
  while(depth > 0) {
    var _points = []; // temporary array to hold the new points

    // if closed add the first point at the back
    if(closed) {
      points.push(points[0]);
    }

    // loop through point 0 -> point n-1
    for(var i = 0; i < points.length - 1; i += 1) {
      var point0 = points[i];     // point n
      var point1 = points[i + 1]; // point n+1

      // calculate the point 1/4 between point n and point n+1
      var quarter0 = {
        x: point0.x * (3/4) + point1.x * (1/4),
        y: point0.y * (3/4) + point1.y * (1/4)
      };

      // calculate the point 3/4 between point n and point n+1
      var quarter1 = {
        x: point0.x * (1/4) + point1.x * (3/4),
        y: point0.y * (1/4) + point1.y * (3/4)
      };

      // if not closed then we want to extend the first and last point
      if(!closed) {
        if(i === 0) {
          quarter0 = point0;
        }
        else if(i === points.length - 2) {
          quarter1 = point1;
        }
      }

      _points.push(quarter0);
      _points.push(quarter1);
    }

    // save the new point to use in the next iteration
    points = _.clone(_points);

    depth -= 1;
  }

  return points;
};

module.exports = calculate;