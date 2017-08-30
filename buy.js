#!/usr/bin/env node

const program = require('commander');
const buy = require('./lib.js').buy;
 
let currency, rate, amount;
program
  .version('0.1.0')
  .arguments('<cur> <rat> <amo>')
  .action(function (cur, rat, amo) {
    currency = cur;
    rate = rat;
    amount = amo;
  });
 
program.parse(process.argv);

(async () => {
  currency = 'USDT_' + (currency || 'eth').toUpperCase();
  let result = await buy(currency, rate, (amount / rate));
  console.log(result);
})();
