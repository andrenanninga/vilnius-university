/*global dat:false */

'use strict';

var _ = require('underscore');
var Line = require('./line');
var calculateCollisions = require('./collisions');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var curves = {};
var collisions = [];
var controls = {
  root: new dat.GUI()
};

var options = {
  _addLine: function(algorithm) {
    var line = new Line(context, algorithm);
    var name = 'line' + (_.keys(curves).length);

    curves[name] = line;
    controls[name] = controls.root.addFolder(name);
    line.registerControls(controls[name]);

    // make sure only the new curve's folder is open
    _.invoke(controls.root.__folders, 'close');
    controls[name].open();
  },

  addChaikin: function() {
    options._addLine(Line.Algorithms.CHAIKIN);
  },

  addDeCasteljau: function() {
    options._addLine(Line.Algorithms.DECASTELJAU);
  },

  addSpline: function() {
    options._addLine(Line.Algorithms.SPLINE);
  }
};

controls.root.add(options, 'addChaikin');
controls.root.add(options, 'addDeCasteljau');
controls.root.add(options, 'addSpline');

// prevent errors on browsers that don't support context.setLineDash
if(!context.setLineDash) {
  context.setLineDash = function () {};
}

// ensure that the canvas is always the size of the window
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// trigger event to force canvas resize
window.dispatchEvent(new Event('resize'));

// update
var update = function() {
  _.each(_.values(controls.root.__folders), function(folder) {
    curves[folder.name].setActive(!folder.closed);
  });

  context.clearRect(0, 0, canvas.width, canvas.height);

  _.each(curves, function(curve) {
    if(!curve.polygon.active) {
      context.globalAlpha = 0.6;
    }
    else {
      context.globalAlpha = 1;
    }

    curve.draw();
  });

  // calculate collisions
  // draw collisions
  if(window.invalidCollisions) {
    collisions = calculateCollisions(_.values(curves));
    window.invalidCollisions = false;
  }

  context.globalAlpha = 1;
  _.each(collisions, function(collision) {
    context.beginPath();
    context.arc(collision.x, collision.y, 5, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
  });

  setTimeout(update, 100);
};
update();

// set global for easier development
window.update = update;
window.curves = curves;
window.controls = controls;
window.collisions = collisions;
window._ = _;