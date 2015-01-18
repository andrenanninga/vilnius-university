# Forward & Backward chaining

Andre Nanninga <ag.nanninga@gmail.com>

```bash
# installation
$ npm install

# run
$ node index.js

Usage: node index.js [options]

Options:
   -c DIRECTION, --chaining DIRECTION   
   -f FILE, --file FILE     

# forward-chaining
$ node index.js -c forward -f ./chains/basic.chain

# backward-chaining
$ node index.js -c backward -f ./chains/basic.chain

# test
$ mocha
```