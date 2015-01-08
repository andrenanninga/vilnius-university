'use strict';

var _ = require('underscore');

var Polygon = function(context, parent) {
  this.context = context;
  this.parent = parent;

  // default options
  this.color = '#E74733';
  this.visible = true;
  this.active = true;

  this.points = [];
  this.activePoint = null;

  this.registerEventListeners();
};

Polygon.prototype.getPoints = function() {
  var points = [];

  // return new points to make sure that we don't just pass the reference
  _.each(this.points, function(point) {
    points.push({
      x: point.x,
      y: point.y
    });
  });

  return points;
};

Polygon.prototype.draw = function() {
  // don't draw when invisible
  if(!this.visible || this.points.length === 0) {
    return;
  }

  this.context.save();

  // setup path
  this.context.beginPath();
  this.context.fillStyle = this.color;
  this.context.strokeStyle = this.color;
  this.context.setLineDash([5, 10]);
  this.context.lineWidth = 1;

  // move path to start
  this.context.moveTo(this.points[0].x, this.points[0].y);

  // draw line to every point
  _.each(this.points, function(point) {
    this.context.lineTo(point.x, point.y);
    this.context.fillRect(point.x - 4, point.y - 4, 8, 8);
  }, this);

  this.context.stroke();
  this.context.closePath();

  this.context.restore();
};

Polygon.prototype.removeLastPoint = function() {
  this.points.pop();
  this.parent.calculate();
};

Polygon.prototype.registerEventListeners = function() {
  var self = this;
  var canvas = this.context.canvas;

  canvas.addEventListener('mousedown', function(e) { self._mousedown.call(self, e); });
  canvas.addEventListener('mouseup', function(e) { self._mouseup.call(self, e); });
  canvas.addEventListener('mousemove', function(e) { self._mousemove.call(self, e); });
};

Polygon.prototype._mousedown = function(e) {
  // don't do anything when not active
  if(!this.active) {
    return;
  }

  var x = e.offsetX;
  var y = e.offsetY;

  this.activePoint = null;

  // check which (if any) point is being clicked on
  _.each(this.points, function(p) {
    if(p.x - 4 < x && p.x + 4 > x && p.y - 4 < y && p.y + 4 > y) {
      this.activePoint = p;
    }
  }, this);
};

Polygon.prototype._mouseup = function(e) {
  // don't do anything when not active
  if(!this.active) {
    return;
  }

  // release active point
  if(this.activePoint !== null) {
    this.activePoint = null;
  }
  // else add new point
  else {
    this.points.push({ x: e.offsetX, y: e.offsetY });
    this.parent.calculate();
  }
};

Polygon.prototype._mousemove = function(e) {
  // don't do anything when not active
  if(!this.active) {
    return;
  }

  // move active point
  if(this.activePoint !== null) {
    this.activePoint.x += e.movementX;
    this.activePoint.y += e.movementY;
    
    this.parent.calculate();
  }
};

module.exports = Polygon;