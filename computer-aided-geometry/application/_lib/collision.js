'use strict';

var _ = require('underscore');

var collisions = function(curves, context) {
  var collisions = [];

  for(var i = 0; i < curves.length; i++) {
    for(var j = i + 1; j < curves.length; j++) {
      var curve0 = curves[i];
      var curve1 = curves[j];

      collisions.push(collision(curve0, curve1));
    }
  }

  collisions = _.flatten(collisions);

  _.each(collisions, function(collision) {
    context.strokeStyle = '#000000';
    context.beginPath();
    context.moveTo(collision.x - 4, collision.y - 4);
    context.lineTo(collision.x + 4, collision.y + 4);
    context.moveTo(collision.x + 4, collision.y - 4);
    context.lineTo(collision.x - 4, collision.y + 4);
    context.lineWidth = 15;
    context.stroke();
    context.closePath();
    context.lineWidth = 1;
  });
};

var collision = function(curve0, curve1) {
  var collision = [];
  var collisions = [];
  var continuous = false;

  for(var i = 0; i < curve0.deCasteljau.polygon.length; i++) {
    for(var j = 0; j < curve1.deCasteljau.polygon.length; j++) {
      var point0 = curve0.deCasteljau.polygon[i];
      var point1 = curve1.deCasteljau.polygon[j];

      if(colliding(point0, point1)) {
        collision.push(point0);
        collision.push(point1);
        continuous = true;
      }
      else {
        if(collision) {
          continuous = false;
          collisions.push(center(collision));
          collision = [];
        }
      }
    }
  }

  return collisions;
};

var colliding = function(point0, point1) {
  var box0 = {
    left: point0.x - 2,
    top: point0.y - 2,
    right: point0.x + 2,
    bottom: point0.y + 2,
  };
  var box1 = {
    left: point1.x - 2,
    top: point1.y - 2,
    right: point1.x + 2,
    bottom: point1.y + 2,
  };

  return !(
    box1.left > box0.right || 
    box1.right < box0.left || 
    box1.top > box0.bottom || 
    box1.bottom < box0.top
  );
};

var center = function(points) {
  points = _.flatten(points);

  var average = {
    x:  _.reduce(_.pluck(points, 'x'), function(memo, num){ return memo + num; }, 0) / points.length,
    y:  _.reduce(_.pluck(points, 'y'), function(memo, num){ return memo + num; }, 0) / points.length,
  };

  return average;
};

module.exports = collisions;