'use strict';

var _ = require('underscore');
var randomColor = require('randomcolor');

var Polygon = require('./polygon');
var chaikin = require('./chaikin');
var deCasteljau = require('./deCasteljau');
var spline = require('./spline');

var Line = function(context, algorithm) {
  this.context = context;
  this.algorithm = algorithm;

  this.color = randomColor({ luminosity: 'dark' });
  this.visible = true;
  this.closed = false;
  this.polygon = new Polygon(context, this);
  this.depth = 7;
  this.points = [];
};

Line.Algorithms = {
  CHAIKIN: 1,
  DECASTELJAU: 2,
  SPLINE: 3
};

Line.prototype.calculate = _.throttle(function() {
  var points = this.polygon.getPoints();
  var depth = this.depth;
  var closed = this.closed;

  switch(this.algorithm) {
    case Line.Algorithms.CHAIKIN: 
      this.points = chaikin(points, depth, closed);
      break;

    case Line.Algorithms.DECASTELJAU:
      this.points = deCasteljau(points, depth, closed);
      break;

    case Line.Algorithms.SPLINE:
      this.points = spline(points, depth, closed);
      break;
  }

  window.invalidCollisions = true;
}, 100);

Line.prototype.draw = function() {
  this.polygon.draw();
  
  // don't draw when invisible
  if(!this.visible || this.points.length === 0) {
    return;
  }

  this.context.save();

  // setup path
  this.context.beginPath();
  this.context.strokeStyle = this.color;
  this.context.lineWidth = 2;

  // move path to start
  this.context.moveTo(this.points[0].x, this.points[0].y);

  // draw line to every point
  _.each(this.points, function(point) {
    this.context.lineTo(point.x, point.y);
  }, this);

  // if closed we need to draw a line back to the start
  if(this.closed) {
    this.context.lineTo(this.points[0].x, this.points[0].y);
  }

  this.context.stroke();
  this.context.closePath();

  this.context.restore();
};

Line.prototype.registerControls = function(parent) {
  var calculate = _.bind(this.calculate, this);

  parent.add(this, 'visible');
  parent.add(this, 'closed').onFinishChange(calculate);
  parent.add(this, 'depth').min(0).max(10).step(1).onChange(calculate);
  parent.addColor(this, 'color');
  parent.add(this.polygon, 'removeLastPoint');
};

Line.prototype.setActive = function(active) {
  this.polygon.active = active;
};

Line.prototype.setVisible = function(visible) {
  this.visible = visible;
  this.polygon.visible = visible;
};

module.exports = Line;