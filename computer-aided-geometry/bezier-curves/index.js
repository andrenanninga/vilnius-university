/* jslint node: true */
/* jslint browser: true */

// [todo] - movable control points
// [todo] - quadratic: closed, open, subdivision closed & subdivision open
// [todo] - cubic:     closed, open, subdivision closed & subdivision open

'use strict';

var Polygon = require('./polygon');
var Chaikin = require('./chaikin');
var DeCasteljau = require('./de-casteljau');

var chaikinCanvas = document.getElementById('chaikin-canvas');
var chaikinContext = chaikinCanvas.getContext('2d');

var decasteljauCanvas = document.getElementById('decasteljau-canvas');
var decasteljauContext = decasteljauCanvas.getContext('2d');

chaikinContext.fillStyle = '#ffaa00';
decasteljauContext.fillStyle = '#ffaa00';

var polygon = new Polygon(
  { x: 100, y: 100 },
  { x: 270, y: 220 },
  { x: 300, y: 330 },
  { x: 150, y: 300 }
);

var chaikin = new Chaikin(polygon.points);
var deCasteljau = new DeCasteljau(polygon.points);

function draw() {
  chaikinContext.clearRect(0, 0, 1000, 1000);
  decasteljauContext.clearRect(0, 0, 1000, 1000);

  chaikin.draw(chaikinContext);
  deCasteljau.draw(decasteljauContext);

  polygon.draw(chaikinContext);
  polygon.draw(decasteljauContext);
}

draw();

document.getElementById('chaikin-steps').addEventListener('change', function() {
  chaikin.depth = parseInt(this.value, 10);
  chaikin.steps = [];
  chaikin.calculate();
  draw();
});

document.getElementById('decasteljau-accuracy').addEventListener('change', function() {
  deCasteljau.accuracy = 1 / parseInt(this.value, 10);
  deCasteljau.steps = [];
  deCasteljau.calculate();
  draw();
});

document.getElementById('polygon-add').addEventListener('click', function() {
  polygon.push({
    x: random(50, 350),
    y: random(50, 350),
  });

  chaikin.steps = [];
  chaikin.calculate();

  deCasteljau.steps = [];
  deCasteljau.calculate();
  draw();
});

document.getElementById('polygon-remove').addEventListener('click', function() {
  polygon.points.splice(random(0, polygon.points.length - 1), 1);

  chaikin.steps = [];
  chaikin.calculate();
  
  deCasteljau.steps = [];
  deCasteljau.calculate();
  draw();
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.deCasteljau = deCasteljau;
window.chaikin = chaikin;
window.polygon = polygon;