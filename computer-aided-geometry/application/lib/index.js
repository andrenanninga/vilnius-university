'use strict';

var Polygon = require('./polygon');
var Chaikin = require('./chaikin');
var DeCasteljau = require('./de-casteljau');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

if(!context.setLineDash) {
  context.setLineDash = function () {};
}

var polygon = new Polygon(
  context, 
  [
    { 'x': 149,'y': 175 },
    { 'x': 358,'y': 139 },
    { 'x': 413,'y': 280 },
    { 'x': 278,'y': 367 },
    { 'x': 106,'y': 327 }
  ]
);


var chaikin = new Chaikin(context, polygon.points, false);
var deCasteljau = new DeCasteljau(context, polygon.points, false);
deCasteljau.closed = false;
deCasteljau.visible = false;

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
controls.chaikin.add(chaikin, 'closed');
controls.chaikin.add(chaikin, 'depth').min(0).max(8).step(1);
controls.chaikin.addColor(chaikin, 'color');
controls.chaikin.open();

controls.deCasteljau = controls.root.addFolder('de Casteljau');
controls.deCasteljau.add(deCasteljau, 'visible');
controls.deCasteljau.add(deCasteljau, 'closed');
controls.deCasteljau.add(deCasteljau, 'precision').min(1).max(100).step(1);
controls.deCasteljau.addColor(deCasteljau, 'color');

var update = function() {
  requestAnimationFrame(update);

  context.clearRect(0, 0, canvas.width, canvas.height);
  polygon.draw();

  chaikin.calculate();
  chaikin.draw();

  deCasteljau.calculate();
  deCasteljau.draw();
};


window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.dispatchEvent(new Event('resize'));
update();

window.polygon = polygon;
window.chaikin = chaikin;
window.deCasteljau = deCasteljau;