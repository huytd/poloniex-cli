#!/usr/bin/env node

const program = require('commander');
const get_orders = require('./lib.js').get_orders;
 
let currency, action;
program
  .version('0.1.0')
  .arguments('<cur>')
  .action(function (cur) {
    currency = cur;
  });
 
program.parse(process.argv);

(async () => {
  currency = 'USDT_' + (currency || 'eth').toUpperCase();
  let result = await get_orders(currency);
  console.log(currency);
  console.log(result);
})();
