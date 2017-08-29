#!/usr/bin/env node

const program = require('commander');
const cancel = require('./lib.js').cancel;
 
let order;
program
  .version('0.1.0')
  .arguments('<ord>')
  .action(function (ord) {
    order = ord;
  });
 
program.parse(process.argv);

(async () => {
  let result = await cancel(order);
  console.log(result);
})();
