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

  currency = currency || 'eth';
  let response = await fetch('https://api.cryptowat.ch/markets/poloniex/'+currency+'usd/price');
  let json = await response.json();
  console.log('Price: ', json.result.price);

  let ticker_response = await fetch('https://poloniex.com/public?command=returnTicker');
  let ticker_json = await ticker_response.json();
  let ticker = ticker_json['USDT_' + currency.toUpperCase()];
  if (ticker) {
    console.log('24h High: ', ticker.high24hr);
    console.log('24h Low: ', ticker.low24hr);
    console.log('Change: ', (ticker.percentChange * 100).toFixed(2) + '%');
    console.log('Highest bid: ', ticker.highestBid);
    console.log('Lowest ask: ', ticker.lowestAsk);
  }

})();
