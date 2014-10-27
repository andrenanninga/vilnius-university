'use strict';

var Polygon = require('./polygon');
var Chaikin = require('./chaikin');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


var polygon = new Polygon(
  context, 
  [
    { x: 100, y: 100 },
    { x: 270, y: 220 },
    { x: 300, y: 330 }
  ]
);

var chaikin = new Chaikin(context, polygon.points, false);

var controls = {
  root: new dat.GUI()
};

controls.polygon = controls.root.addFolder('polygon');
controls.polygon.add(polygon, 'visible');
controls.polygon.addColor(polygon, 'color');
controls.polygon.add(polygon, 'addPoint');
controls.polygon.add(polygon, 'removePoint');

controls.chaikin = controls.root.addFolder('chaikin');
controls.chaikin.add(chaikin, 'visible');
controls.chaikin.add(chaikin, 'depth').min(0).max(8).step(1);
controls.chaikin.addColor(chaikin, 'color');
controls.chaikin.open();

var update = function() {
  requestAnimationFrame(update);

  context.clearRect(0, 0, canvas.width, canvas.height);
  polygon.draw();

  chaikin.calculate();
  chaikin.draw();
};

update();