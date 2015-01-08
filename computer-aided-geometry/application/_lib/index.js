'use strict';

var Polygon = require('./polygon');
var Chaikin = require('./chaikin');
var DeCasteljau = require('./de-casteljau');

var collision = require('./collision');
var _ = require('underscore');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

if(!context.setLineDash) {
  context.setLineDash = function () {};
}

var curves = {};

var options = {
  addCurve: function() {
    var curve = {};
    curve.polygon = new Polygon(context, []);

    curve.chaikin = new Chaikin(context, curve.polygon.points, false);
    curve.deCasteljau = new DeCasteljau(context, curve.polygon.points, false);

    curve.chaikin.visible = false;

    var name = 'curve' + (_.keys(curves).length);
    curves[name] = curve;
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

    controls[name].open();
    var c = controls[name].add(options, 'setActive');

    c.onChange(function() { options._setActive.apply(this); });
    options._setActive.apply(c);
  },

  setActive: function() {},
  _setActive: function() {
    var activeCurve = this.domElement.parentNode.parentNode.parentNode.querySelector('.title').innerText;
    
    _.each(curves, function(curve, name) {
      if(name === activeCurve) {
        controls[name].open();
        curve.polygon.active = true;
      }
      else {
        controls[name].close();
        curve.polygon.active = false;
      }
    });
  }
};

var controls = {
  root: new dat.GUI()
};

controls.root.add(options, 'addCurve');

var update = function() {
  // requestAnimationFrame(update);

  context.clearRect(0, 0, canvas.width, canvas.height);

  _.each(curves, function(curve) {
    if(!curve.polygon.active) {
      context.globalAlpha = 0.6;
    }
    else {
      context.globalAlpha = 1;
    }

    curve.polygon.draw();
    curve.chaikin.calculate();
    curve.chaikin.draw();
    curve.deCasteljau.calculate();
    curve.deCasteljau.draw();
  });

  collision(_.values(curves), context);
  
  setTimeout(update, 100);
};


window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.dispatchEvent(new Event('resize'));
update();

window.curves = curves;
window.controls = controls;
window._ = _;