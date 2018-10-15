const express = require('express-as-promised');
const promiseEachConcurrency = require('promise-each-concurrency');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns').promises;
const winston = require('winston');
const expressWinston = require('express-winston');

app.use(bodyParser.json());

const logFormat = winston.format.printf(function(info) {
  let date = new Date().toISOString();
  return `${date}-${info.level}: ${JSON.stringify(info, null, 4)}\n`;
});

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.prettyPrint(), logFormat),
    }),
  ],
  meta: true,
  expressFormat: true,
  colorize: false,
}));

app.post('/', async (req, res) => {
  const ips = [...(req.body.ips || []), req.body.ip].filter(Boolean);

  const results = {};

  await promiseEachConcurrency(ips, async (ip) => {
    try {
      results[ip] = await dns.reverse(ip);
    } catch (err) {
      if (err.code === 'ENOTFOUND') {
        results[ip] = [];
      } if (err.code === 'EINVAL') {
        results[ip] = [];
        results.errors = [`IP '${ip}' is invalid`];
      } else {
        throw err;
      }
    }
  });

  return results;
});

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.prettyPrint(), logFormat),
    }),
  ],
  meta: true,
  expressFormat: true,
  colorize: true,
}));

app.listen(process.env.PORT || 8465);
