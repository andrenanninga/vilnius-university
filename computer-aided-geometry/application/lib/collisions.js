'use strict';

var _ = require('underscore');

var calculateCollision = function(curves) {
  var collisions = [];

  for(var i = 0; i < curves.length; i++) {
    for(var j = i + 1; j < curves.length; j++) {
      var curve0 = curves[i];
      var curve1 = curves[j];

      var box0 = getBoundingBox(curve0.polygon.points);
      var box1 = getBoundingBox(curve1.polygon.points);

      if(intersect(box0, box1)) {
        var subsections0 = getSubsections(curve0.points);
        var subsections1 = getSubsections(curve1.points);

        var intersections = filterIntersecting(subsections0, subsections1);
        
        collisions = _.union(collisions, groupIntersecting(intersections));
      }
    }
  }

  return collisions;
};

var intersect = function(box0, box1) {
  return !(
    box1.x0 > box0.x1 || 
    box1.x1 < box0.x0 || 
    box1.y0 > box0.y1 || 
    box1.y1 < box0.y0);
};

var getBoundingBox = function(points) {
  return {
    x0: _.min(_.pluck(points, 'x')),
    y0: _.min(_.pluck(points, 'y')),
    x1: _.max(_.pluck(points, 'x')),
    y1: _.max(_.pluck(points, 'y'))
  };
};

var getSubsections = function(points) {
  var lines = [];

  for(var i = 0; i < points.length - 1; i++) {
    var point0 = points[i];
    var point1 = points[i + 1];

    lines.push(getBoundingBox([point0, point1]));
  }

  return lines;
};

var filterIntersecting = function(subsections0, subsections1) {
  var pairs = [];

  _.each(subsections0, function(subsection0) {
    _.each(subsections1, function(subsection1) {
      pairs.push([subsection0, subsection1]);
    });
  });

  var intersecting = _.filter(pairs, function(pair) {
    return intersect(pair[0], pair[1]);
  });

  return _.uniq(_.flatten(intersecting));
};

var groupIntersecting = function(intersections) {
  var centers = [];

  _.each(intersections, function(intersection) {
    var newCenter = true;

    if(intersection.x1 - intersection.x0 > 10 || intersection.y1 - intersection.y0 > 10) {
      return;
    }

    _.each(centers, function(center) {
      if(Math.abs(center.x - intersection.x0) < 3 || 
        Math.abs(center.x - intersection.x1) < 3 || 
        Math.abs(center.y - intersection.y0) < 3 || 
        Math.abs(center.y - intersection.y1) < 3) {
        
        newCenter = false;
        center.x = (center.x * center.n) + (intersection.x0 + intersection.x1) / 2;
        center.y = (center.y * center.n) + (intersection.y0 + intersection.y1) / 2;
        center.n += 1;
        center.x = center.x / center.n;
        center.y = center.y / center.n;
      }
    });

    if(newCenter) {
      centers.push({
        x: (intersection.x0 + intersection.x1) / 2,
        y: (intersection.y0 + intersection.y1) / 2,
        n: 1
      });
    }
  });

  return centers;
};

module.exports = calculateCollision;