'use strict';

var fs = require('fs');

var parse = function(file, cb) {
  fs.readFile(file, function(err, data) {
    if(err) {
      return cb(err);
    }

    var lines = data.toString().split(/\r?\n/);

    for(var i = 0; i < lines.length; i += 1) {
      var line = lines[i];
      
      console.log(line);
    }
  });
};

parse('../1.data', function(err, data) {
  if(err) {
    console.error(err);
    process.exit();
  }

  console.log(data.rules);
});