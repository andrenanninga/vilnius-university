'use strict';

var Hanoi = function(discs) {
  this.reset(discs);
};

Hanoi.prototype.reset = function(discs, algorithm) {
  this.discs = discs;
  this.states = [];
  this.algorithm = algorithm || 'recursive';

  this.towers = {
    'A': [],  // initial 
    'B': [],  // intermediate
    'C': []  // target
  };

  for(var i = this.discs; i > 0; i--) {
    this.towers.A.push(i);
  }
};

Hanoi.prototype.saveState = function() {
  this.states.push([
    this.towers.A.slice(0),
    this.towers.B.slice(0),
    this.towers.C.slice(0)
  ]);
};

Hanoi.prototype.replay = function() {
  var self = this;
  var stdin = process.openStdin();
  
  console.log('press any key to show the ' + this.algorithm + ' solution');

  stdin.on('data', function() {
    var state = self.states.splice(0, 1)[0];

    process.stdout.write('\u001B[2J\u001B[0;0f');

    if(self.algorithm === 'recursive') {
      self.print('linear', state);
    }
    else if(self.algorithm === 'iterative') {
      self.print('circular', state);
    }

    if(self.states.length === 0) {
      process.exit(0);
    }

    return false;
  });
};

Hanoi.prototype.solve = function(algorithm) {
  if(algorithm === 'recursive') {
    this.solveRecursive();
  }
  else if(algorithm === 'iterative') {
    this.solveIterative();
  }

  this.replay();
};

Hanoi.prototype.solveRecursive = function() {
  this.algorithm = 'recursive';
  this.saveState();

  this._solveRecursive('A', 'B', 'C', this.discs);
};

Hanoi.prototype._solveRecursive = function(x, y, z, n) {
  if(n > 0) {
    this._solveRecursive(x, z, y, n - 1);

    // move disc from tower x to tower z
    this.moveDisc(n, this.towers[x], this.towers[z]);
    this.saveState();

    this._solveRecursive(y, x, z, n - 1);
  }
};

Hanoi.prototype.solveIterative = function() {
  this.algorithm = 'iterative';
  this.saveState();

  var lastDisc = -1;
  var self = this;

  var isTopDiscOnTower = function(tower, disc) {
    return tower.indexOf(disc) === tower.length - 1;
  };

  var getNextTower = function(tower, direction) {
    var towers = ['A', 'B', 'C'];
    var index = towers.indexOf(tower);

    index += direction;

    if(index >= towers.length) {
      index = 0;
    }
    else if(index < 0) {
      index = towers.length - 1;
    }

    return self.towers[towers[index]];
  };

  var isLegalMove = function(disc, fromTower, toTower) {
    var index = fromTower.indexOf(disc); // find index of the disc

    if(index === -1) {
      return false;
    }

    if(index !== fromTower.length - 1) {
      return false;
    }

    if(toTower[toTower.length - 1] < disc) {
      return false;
    }

    return true;
  };

  while(this.towers.B.length !== this.discs && this.towers.C.length !== this.discs) {
    var madeMove = false;
    for(var i = 1; i <= this.discs; i++) {

      if(i === lastDisc) {
        continue;
      }

      var direction = i % 2 === 0 ? -1 : 1;
      var towers = ['A', 'B', 'C'];

      for(var j = 0; j < towers.length; j++) {
        var tower = this.towers[towers[j]];

        if(isTopDiscOnTower(tower, i)) {
          var nextTower = getNextTower(towers[j], direction);
          
          if(isLegalMove(i, tower, nextTower)) {
            this.moveDisc(i, tower, nextTower);
            lastDisc = i;
            madeMove = true;

            this.saveState();
            break;
          }
        }
      }

      if(madeMove) {
        break;
      }
    }
  }
};

Hanoi.prototype.moveDisc = function(disc, fromTower, toTower) {
  var index = fromTower.indexOf(disc); // find index of the disc
  fromTower.splice(index, 1); // remove disc from tower
  toTower.push(disc); // add disc to other tower
};

Hanoi.prototype.print = function(layout, state) {
  var canvas = [];
  var i;
  var towers;
  layout = layout || 'linear';

  if(state) {
    // print each tower
    towers = [
      this._towerToString(state[0], 'A').split('\n'),
      this._towerToString(state[1], 'B').split('\n'),
      this._towerToString(state[2], 'C').split('\n')
    ];
  }
  else {
    // print each tower
    towers = [
      this._towerToString(this.towers.A, 'A').split('\n'),
      this._towerToString(this.towers.B, 'B').split('\n'),
      this._towerToString(this.towers.C, 'C').split('\n')
    ];
  }

  // join the lines for each tower together to create a side-by-side view
  if(layout === 'linear') {
    for(i = 0; i < towers[0].length; i++) {
      canvas.push(towers[0][i] + ' ' + towers[1][i] + ' ' + towers[2][i]);
    }
  }
  else if(layout === 'circular') {
    var padding = new Array(Math.round(towers[0].length / 2) + 1).join(' ');

    for(i = 0; i < towers[0].length; i++) {
      canvas.push(towers[0][i] + ' ' + towers[1][i]);
    }

    for(i = 0; i < towers[0].length; i++) {
      canvas.push(padding + towers[2][i]);
    }
  }

  console.log(canvas.join('\n') + '\n');
};

Hanoi.prototype._towerToString = function(tower, name) {
  var width = this.discs * 2 + 3;
  var middle = Math.floor(width / 2);
  name = name || ' ';

  // repeat any charater n times and return the string
  // default character is a space
  var repeat = function(amount, character) {
    character = character || ' ';

    return new Array(Math.floor(amount) + 1).join(character);
  };

  var canvas = [];


  // check for the maximum amount of disc possible on a single tower
  for(var i = this.discs; i >= 0; i--) {
    // if a disc is found at the index then print it
    if(tower[i]) {
      var disc = tower[i];
      var discWidth = disc * 2 + 1;
      var outerPadding = Math.floor((width - discWidth) / 2);
      var innerPadding = disc - 1;

      // create a line for the top of a disc
      canvas.push(repeat(outerPadding) + repeat(discWidth, '-') + repeat(outerPadding));
      // create the body for the disc
      canvas.push(repeat(outerPadding) + '|' + repeat(innerPadding) + tower[i] + repeat(innerPadding) + '|' + repeat(outerPadding));
    }
    // if no disc is found then print the stick
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