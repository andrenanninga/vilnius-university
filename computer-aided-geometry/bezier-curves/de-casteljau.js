/* jshint node: true */

'use strict';

var DeCasteljau = function(points, closed) {
  this.points = points;
  this.closed = false;

  this.steps = [];
  this.polygon = points;
  this.accuracy = 0.1;

  this.calculate();
};

DeCasteljau.prototype.calculate = function() {
  var points = this.points.slice(0);
  var groups = [];
  var group, i;

  for(i = 0; i < points.length; i += 1) {
    group = [];

    if(i === 0) {
      group.push(points[points.length - 1]);
    }
    else {
      group.push(points[i - 1]);
    }

    group.push(points[i]);

    if(i === points.length - 1) {
      group.push(points[0]);
    }
    else {
      group.push(points[i + 1]);
    }

    groups.push(group);
  }

  for(i = 0; i < groups.length; i += 1) {
    var _points = [];
    group = groups[i];
    
    for(var t = 0; t < 1; t += this.accuracy) {
      var point0 = group[0];
      var point1 = group[1];
      var point2 = group[2];

      var midpoint0 = {
        x: point0.x * (1 - 0.5) + point1.x * (0.5),
        y: point0.y * (1 - 0.5) + point1.y * (0.5)
      };

      var midpoint1 = {
        x: point1.x * (1 - 0.5) + point2.x * (0.5),
        y: point1.y * (1 - 0.5) + point2.y * (0.5)
      };

      var barypoint0 = {
        x: midpoint0.x * (1 - t) + point1.x * (t),
        y: midpoint0.y * (1 - t) + point1.y * (t)
      };

      var barypoint1 = {
        x: point1.x * (1 - t) + midpoint1.x * (t),
        y: point1.y * (1 - t) + midpoint1.y * (t)
      };

      var drawpoint = {
        x: barypoint0.x * (1 - t) + barypoint1.x * (t),
        y: barypoint0.y * (1 - t) + barypoint1.y * (t)
      };

      _points.push(drawpoint);
    }

    this.steps.push(_points.slice(0));
  }

  console.log(this);
};

DeCasteljau.prototype.draw = function(context) {
  context.beginPath();

  context.moveTo(this.steps[0][0].x, this.steps[0][0].y);

  for(var i = 0; i < this.steps.length; i += 1) {
    var step = this.steps[i];

    for(var j = 0; j < step.length; j += 1) {
      var point = step[j];

      context.lineTo(point.x, point.y);
    }
  }
  
  context.lineTo(this.steps[0][0].x, this.steps[0][0].y);
  
  context.stroke();
  context.closePath();
};

module.exports = DeCasteljau;