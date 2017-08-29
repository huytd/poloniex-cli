#!/usr/bin/env node

const program = require('commander');
const replace = require('./lib.js').replace;
 
let order, rate;
program
  .version('0.1.0')
  .arguments('<ord> <rat>')
  .action(function (ord, rat) {
    order = ord;
    rate = rat;
  });
 
program.parse(process.argv);

(async () => {
  let result = await replace(order, rate);
  console.log(result);
})();
