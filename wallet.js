#!/usr/bin/env node

const program = require('commander');
 
let currency;
program
  .version('0.1.0')
  .arguments('<cur>')
  .action(function (cur) {
     currency = cur;
  });
 
program.parse(process.argv);

const call = require('./lib.js').call;

(async () => {

  let result = await call('returnCompleteBalances');
  let usd = result.USDT;
  console.log('Available USD: ', usd.available);

  if (currency) {
    let coin = currency.toUpperCase();
    if (result[coin]) {
      console.log(coin, 'wallet');
      console.log('Available: ', result[coin].available);
      console.log('In Orders: ', result[coin].onOrders);
    }
  }

})();
