'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const https = require('https');
const fs = require('fs');

const app = express();
const options = {
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CERT)
};
const sslServer = https.createServer(options, app);

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(express.static('public'));

const databaseData = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWD,
  database: process.env.DATABASE
};

const port = process.env.PORT || 8080;

routes.allRoutes(databaseData, app);

sslServer.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App is ready on port ${port}`);
  }
});