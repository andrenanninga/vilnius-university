'use strict';

var util = require('util');

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
  console.log(this.towers);

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