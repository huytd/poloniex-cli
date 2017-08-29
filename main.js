#!/usr/bin/env node

const program = require('commander');

program
  .version('0.1.0')
  .command('price [currency]', 'View pricing info')
  .command('wallet [currency]', 'View wallet info')
  .command('orders [currency]', 'View orders')
  .command('history [currency]', 'View trading history')
  .command('buy [currency] [rate] [amount]', 'Place a buy order')
  .command('sell [currency] [rate] [amount]', 'Place a sell order')
  .command('cancel [orderNumber]', 'Cancel an order')
  .command('replace [orderNumber] [rate]', 'Replace a rate in an order')
  .parse(process.argv);
