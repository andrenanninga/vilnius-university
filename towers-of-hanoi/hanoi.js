'use strict';

var util = require('util');
var Canvas = require('./canvas');

var Hanoi = function(disks) {
  this.towers = {
    'src': [], // initial 
    'aux': [], // intermediate
    'dest': []  // target
  };

  this.disks = disks;

  this._init();
};

Hanoi.prototype._init = function() {
  for(var i = this.disks; i > 0; i--) {
    this.towers.src.push(i);
  }
};

Hanoi.prototype.solve = function() {
  // this.print();

  // return;

  this._solve(
    'src',
    'aux',
    'dest',
    this.disks
  );
};

Hanoi.prototype._solve = function(x, y, z, n) {
  if(n > 0) {
    this._solve(x, z, y, n - 1);

    var disc = this.towers[x].indexOf(n); // find index of the disc
    this.towers[x].splice(disc, 1); // remove disc from tower
    this.towers[z].push(n); // add disc to other tower

    console.log(this.towers);

    this._solve(y, x, z, n - 1);
  }
};

Hanoi.prototype.print = function() {
  var maxDiskWidth = (this.disks + 1) * 2 + 1;
  var maxDiskHeight = 3;
  
  var width = 60;
  var height = this.disks * maxDiskHeight + 4;

  var canvas = new Canvas(width, height);
  this._printTower(canvas, 0, this.towers.src);
  this._printTower(canvas, 1, this.towers.aux);
  this._printTower(canvas, 2, this.towers.dest);

  console.log(canvas.toString());

};

Hanoi.prototype._printTower = function(canvas, num, tower) {
  var towerWidth = (this.disks + 1) * 2 + 2;
  var towerHeight = this.disks * 3 + 4;
  var towerXOffset = num * (towerWidth + 2);

  var center = towerWidth / 2;

  var i;

  // draw pole
  for(i = 0; i < towerHeight; i++) {
    canvas.setChar(center + towerXOffset, i, '┃');
  }

  // draw base
  for(i = 0; i < towerWidth; i++) {
    // console.log(i, towerHeight)
    canvas.setChar(i + towerXOffset, towerHeight - 1, '━');
  }
};

// Hanoi.prototype.print = function() {
//   for(var i = 0; i < this.towers.length; i++) {
//     for(var j = 0; j < this.disks; j++) {
//       util.print('|');
//     }

//     util.print('\n');
//   }
// };

// Hanoi.prototype._toStringTower = function(tower) {
//   var lines = [];

//   var height = this.disks * 2 + 2;
//   var width = this.disks * 2 + 1;
//   var middle = width / 2;

//   lines.push()

//   for(var i = 0 i < height; i++) {

//   }
// }

module.exports = Hanoi;