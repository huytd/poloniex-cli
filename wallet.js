#!/usr/bin/env node

const program = require('commander');
const call = require('./lib.js').call;
const Table = require('cli-table');
 
let currency;
program
  .version('0.1.0')
  .arguments('<cur>')
  .action(function (cur) {
     currency = cur;
  });
 
program.parse(process.argv);

(async () => {

  let output = new Table();
  let result = await call('returnCompleteBalances');
  let usd = result.USDT;
  output.push(['Available USD', usd.available]);

  if (currency) {
    let coin = currency.toUpperCase();
    if (result[coin]) {
      output.push(['Available ' + coin, result[coin].available]);
      output.push([coin + ' in Orders: ', result[coin].onOrders]);
    }
  }

  console.log(output.toString());

})();
