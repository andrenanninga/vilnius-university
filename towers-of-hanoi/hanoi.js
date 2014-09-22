'use strict';

var Hanoi = function(disks) {
  this.reset(disks);
};

Hanoi.prototype.reset = function(disks) {
  this.disks = disks;
  this.moves = 0;

  this.towers = {
    'A': [],  // initial 
    'B': [],  // intermediate
    'C': []  // target
  };

  for(var i = this.disks; i > 0; i--) {
    this.towers.A.push(i);
  }
};

Hanoi.prototype.solveRecursive = function() {
  console.log('Initial state\n');
  this.print();

  this._solveRecursive('A', 'B', 'C', this.disks);
};

Hanoi.prototype._solveRecursive = function(x, y, z, n) {
  if(n > 0) {
    this._solveRecursive(x, z, y, n - 1);

    // move disk from tower x to tower z
    var disc = this.towers[x].indexOf(n); // find index of the disc
    this.towers[x].splice(disc, 1); // remove disc from tower
    this.towers[z].push(n); // add disc to other tower

    this.moves += 1;
    console.log('Move ' + this.moves + ': move disk ' + n + ' from tower \'' + x + '\' to tower \'' + z + '\'\n');

    this.print();

    this._solveRecursive(y, x, z, n - 1);
  }
};

Hanoi.prototype.solveIterative = function() {
};

Hanoi.prototype.print = function() {
  // print each tower
  var towers = [
    this._towerToString(this.towers.A, 'A').split('\n'),
    this._towerToString(this.towers.B, 'B').split('\n'),
    this._towerToString(this.towers.C, 'C').split('\n')
  ];

  // join the lines for each tower together to create a side-by-side view
  var canvas = [];
  for(var i = 0; i < towers[0].length; i++) {
    canvas.push(towers[0][i] + ' ' + towers[1][i] + ' ' + towers[2][i]);
  }

  console.log(canvas.join('\n') + '\n');
};

Hanoi.prototype._towerToString = function(tower, name) {
  var width = this.disks * 2 + 3;
  var middle = Math.floor(width / 2);
  name = name || ' ';

  // repeat any charater n times and return the string
  // default character is a space
  var repeat = function(amount, character) {
    character = character || ' ';

    return new Array(Math.floor(amount) + 1).join(character);
  };

  var canvas = [];


  // check for the maximum amount of disk possible on a single tower
  for(var i = this.disks; i >= 0; i--) {
    // if a disk is found at the index then print it
    if(tower[i]) {
      var disk = tower[i];
      var diskWidth = disk * 2 + 1;
      var outerPadding = Math.floor((width - diskWidth) / 2);
      var innerPadding = disk - 1;

      // create a line for the top of a disk
      canvas.push(repeat(outerPadding) + repeat(diskWidth, '-') + repeat(outerPadding));
      // create the body for the disk
      canvas.push(repeat(outerPadding) + '|' + repeat(innerPadding) + tower[i] + repeat(innerPadding) + '|' + repeat(outerPadding));
    }
    // if no disk is found then print the stick
    else {
      canvas.push(repeat(middle) + '|' + repeat(middle));
      canvas.push(repeat(middle) + '|' + repeat(middle));
    }
  }

  // add a base for the tower
  canvas.push(repeat(width, '-'));
  canvas.push(repeat(middle) + name + repeat(middle));

  return canvas.join('\n');
};

module.exports = Hanoi;