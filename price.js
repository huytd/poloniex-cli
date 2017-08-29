#!/usr/bin/env node

const program = require('commander');
const fetch = require('node-fetch');
 
let currency;
program
  .version('0.1.0')
  .arguments('<cur>')
  .action(function (cur) {
     currency = cur;
  });
 
program.parse(process.argv);

(async () => {

  let response = await fetch('https://api.cryptowat.ch/markets/poloniex/'+(currency || 'eth')+'usd/price');
  let json = await response.json();
  console.log(json.result.price);

})();
