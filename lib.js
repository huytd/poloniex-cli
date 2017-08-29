const crypto = require('crypto');
const querystring = require('querystring');
const fetch = require('node-fetch');
const Table = require('cli-table');

const API_KEY = process.env.POLONIEX_API_KEY;
const API_SECRET = process.env.POLONIEX_API_SECRET;

if (!API_KEY || !API_SECRET) {
  console.log("Please configure API key!");
  process.exit(0);
}

const api = (command, body) => {
  let nonce = Date.now();
  let request_body = {
    command: command,
    nonce: nonce
  };
  if (body) {
    request_body = Object.assign(request_body, body);
  }
  let data = querystring.stringify(request_body);
  let hash = crypto.createHmac('sha512', API_SECRET)
                   .update(data)
                   .digest('hex');
  let headers = {
    Sign: hash,
    Key: API_KEY,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  return {
    url: 'https://poloniex.com/tradingApi',
    data: data,
    headers: headers
  }
};

const call = async (endpoint, body) => {
  let req = api(endpoint, body);
  let res = await fetch(req.url, {
    method: 'POST',
    body: req.data,
    headers: req.headers
  });
  let json = await res.json();
  return json;
};

const buy = async (pair, rate, amount) => {
  let order = await call('buy', {
    'currencyPair': pair || 'USDT_ETH',
    'rate': rate,
    'amount': amount
  });
  return order;
};

const sell = async (pair, rate, amount) => {
  let order = await call('sell', {
    'currencyPair': pair || 'USDT_ETH',
    'rate': rate,
    'amount': amount
  });
  return order;
};

const cancel = async (number) => {
  let order = await call('cancelOrder', {
    'orderNumber': number
  });
  return order;
};

const replace = async (number, rate) => {
  let order = await call('moveOrder', {
    'orderNumber': number,
    'rate': rate
  });
  return order;
};

const get_orders = async (pair) => {
  let orders = await call('returnOpenOrders', {
    'currencyPair': pair || 'USDT_ETH'
  });
  let order_table = new Table({
    head: ['Order Number', 'Type', 'Rate', 'Amount', 'Total'],
  });
  orders.forEach(order => {
    order_table.push([
      order.orderNumber,
      order.type,
      order.rate,
      order.amount,
      order.total
    ]);
  });
  return order_table.toString();
};

const get_history = async (pair) => {
  let history = await call('returnTradeHistory', {
    'currencyPair': pair || 'USDT_ETH',
    'start': 0,
    'end': Date.now()
  });
  let history_table = new Table({
    head: ['Date', 'Type', 'Rate', 'Amount', 'Total', 'Fee'],
  });
  history.forEach(h => {
    history_table.push([
      h.date,
      h.type,
      h.rate,
      h.amount,
      h.total,
      h.fee
    ]);
  });
  return history_table.toString();
};

module.exports = {
  call: call,
  get_orders: get_orders,
  get_history: get_history,
  buy: buy,
  sell: sell,
  cancel: cancel,
  replace: replace
};
