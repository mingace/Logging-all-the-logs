const express = require('express');
const fs = require('fs');
const app = express();
const csv = require('csvtojson');

const csvFile = 'C:/Users/Customer/Desktop/CCC/Projects/node101-log-all-the-things/server/log.csv';

app.set('json spaces', 2);
 
app.use((req, res, next) => {
  const agent = req.headers['user-agent'].replace(',', '');
  const time = new Date().toISOString();
  const method = req.method;
  const resource = req.url;
  const version = req.httpVersion;
  const status = res.statusCode;
  
  const file = 'C:/Users/Customer/Desktop/CCC/Projects/node101-log-all-the-things/server/log.csv';
  const logLine = `${agent},${time},${method},${resource},HTTP/${version},${status}\n`;
  
  fs.appendFile(file, logLine, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.get('/logs', (req, res) => {
  csv().fromFile(csvFile).then((jsonObj) => {
      res.status(200).json(jsonObj);
    });
  })
  
module.exports = app;