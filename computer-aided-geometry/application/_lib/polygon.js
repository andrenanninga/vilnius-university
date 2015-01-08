'use strict';

var Polygon = function(context, points) {
  this.points = points;
  this.context = context;
  this.color = '#E74733';
  this.visible = true;

  this.active = true;

  this.registerEventListeners();
  this.draw();
};

Polygon.prototype.draw = function() {
  if(!this.visible || this.points.length === 0) {
    return;
  }

  this.context.save();

  this.context.fillStyle = this.color;
  this.context.strokeStyle = this.color;
  this.context.setLineDash([5, 10]);
  this.context.beginPath();
  this.context.moveTo(this.points[0].x, this.points[0].y);

  for(var i = 0; i < this.points.length; i += 1) {
    var point = this.points[i];

    this.context.lineTo(point.x, point.y);
    this.context.fillRect(point.x - 4, point.y - 4, 8, 8);
  }

  this.context.stroke();
  this.context.closePath();

  this.context.restore();
};

Polygon.prototype.push = function(point) {
  this.points.push(point);
};

Polygon.prototype.addPoint = function() {
  var width = this.context.canvas.width;
  var height = this.context.canvas.height;

  var x = Math.random() * width;
  var y = Math.random() * height;

  this.push({
    x: x,
    y: y
  });
};

Polygon.prototype.removePoint = function() {
  this.points.pop();
};

Polygon.prototype.registerEventListeners = function() {
  var self = this;
  var canvas = this.context.canvas;
  var activePoint = null;

  canvas.addEventListener('mousedown', function(e) {
    if(!self.active) {
      return;
    }

    var x = e.offsetX;
    var y = e.offsetY;

    for(var i = 0; i < self.points.length; i += 1) {
      var point = self.points[i];

      if(point.x - 5 < x && point.x + 5 > x && point.y - 5 < y && point.y + 5 > y) {
        activePoint = point;
        break;
      }
    }
  });

  canvas.addEventListener('mouseup', function(e) {
    if(!self.active) {
      return;
    }

    if(activePoint !== null) {
      activePoint = null;
    }
    else {
      self.push({ x: e.offsetX, y: e.offsetY });
    }
  });

  canvas.addEventListener('mousemove', function(e) {
    if(!self.active) {
      return;
    }

    if(activePoint !== null) {
      activePoint.x += e.movementX;
      activePoint.y += e.movementY;
    }
  });
};

module.exports = Polygon;