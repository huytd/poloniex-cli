#!/usr/bin/env node

const program = require('commander');
const fetch = require('node-fetch');
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

  currency = currency || 'eth';
  let response = await fetch('https://api.cryptowat.ch/markets/poloniex/'+currency+'usd/price');
  let json = await response.json();
  output.push(['Price', json.result.price]);

  let ticker_response = await fetch('https://poloniex.com/public?command=returnTicker');
  let ticker_json = await ticker_response.json();
  let ticker = ticker_json['USDT_' + currency.toUpperCase()];
  if (ticker) {
    output.push(['24h High', ticker.high24hr]);
    output.push(['24h Low', ticker.low24hr]);
    output.push(['Change', (ticker.percentChange * 100).toFixed(2) + '%']);
    output.push(['Highest bid', ticker.highestBid]);
    output.push(['Lowest ask', ticker.lowestAsk]);
  }

  console.log(output.toString());

})();
