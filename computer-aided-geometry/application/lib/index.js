'use strict';

var Polygon = require('./polygon');
var Chaikin = require('./chaikin');
var DeCasteljau = require('./de-casteljau');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

if(!context.setLineDash) {
  context.setLineDash = function () {};
}

var curves = [];

var options = {
  addCurve: function() {
    var curve = {};
    curve.polygon = new Polygon(context, 
      [
        { 'x': 149,'y': 175 },
        { 'x': 358,'y': 139 },
        { 'x': 413,'y': 280 }
      ]
    );

    curve.chaikin = new Chaikin(context, curve.polygon.points, false);
    curve.deCasteljau = new DeCasteljau(context, curve.polygon.points, false);

    curves.push(curve);
    var name = 'curve' + (curves.length - 1);
    controls[name] = controls.root.addFolder(name);
    controls[name].polygon = controls[name].addFolder('polygon');
    controls[name].polygon.add(curve.polygon, 'visible');
    controls[name].polygon.addColor(curve.polygon, 'color');
    controls[name].polygon.add(curve.polygon, 'addPoint');
    controls[name].polygon.add(curve.polygon, 'removePoint');

    controls[name].chaikin = controls[name].addFolder('chaikin');
    controls[name].chaikin.add(curve.chaikin, 'visible');
    controls[name].chaikin.add(curve.chaikin, 'closed');
    controls[name].chaikin.add(curve.chaikin, 'depth').min(0).max(8).step(1);
    controls[name].chaikin.addColor(curve.chaikin, 'color');

    controls[name].deCasteljau = controls[name].addFolder('de Casteljau');
    controls[name].deCasteljau.add(curve.deCasteljau, 'visible');
    controls[name].deCasteljau.add(curve.deCasteljau, 'closed');
    controls[name].deCasteljau.add(curve.deCasteljau, 'depth').min(0).max(8).step(1);
    controls[name].deCasteljau.addColor(curve.deCasteljau, 'color');
  }
};

var controls = {
  root: new dat.GUI()
};

controls.root.add(options, 'addCurve');

var update = function() {
  // requestAnimationFrame(update);
  setTimeout(update, 500);

  context.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < curves.length; i++) {
    var curve = curves[i];

    curve.polygon.draw();
    curve.chaikin.calculate();
    curve.chaikin.draw();
    curve.deCasteljau.calculate();
    curve.deCasteljau.draw();
  }
};


window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.dispatchEvent(new Event('resize'));
update();

window.curves = curves;
window.DeCasteljau = DeCasteljau;