var express = require("express");
var app = express();
var path = require('path');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var db = require('./database');
var dbfunc = require('./db-function');
var http = require('http')
var bodyParser = require('body-parser');
var errorCode = require('../common/error-code')
var errorMessage = require('../common/error-methods')
var checkToken = require('./check-token');
var cors = require('cors');
var morgan = require('morgan');
var fs = require('fs');
var cts = require('../config/constants');

const upload = require("../app/controllers/upload.controller");

//API config
var constants = require('../config/constants');

//Routes
var AuthenticRoute = require('../app/routes/authentic.route');
var ActionsRoute = require('../app/routes/actions.route');

dbfunc.connectionCheck.then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});

morgan.token('body', function getBody(req, res) {
  return JSON.stringify(req.body);
});

// app.use(morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res), '-',
//     tokens['http-version'](req, res), '-',
//     tokens.url(req, res), '-',
//     tokens.status(req, res), '-',
//     tokens.date(req, res), '-',
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms', '-',
//     tokens['remote-addr'](req, res),
//     tokens['remote-user'](req, res), '-',
//     tokens['user-agent'](req, res), '-',
//     tokens.body(req, res)
//   ].join(' ')
// }, {
//   stream: fs.createWriteStream(path.join(cts.LOGS_PATH, 'access.log'), { flags: 'a' })
// }
// ));

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),'-',
    tokens['http-version'](req, res),'-',
    tokens.url(req, res),'-',
    tokens.status(req, res),'-',
    tokens.date(req, res),'-',
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms','-',
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),'-',
    tokens['user-agent'](req, res),'-',
    tokens.body(req, res)
  ].join(' ')
}));

app.use(cors());
app.use(bodyParser.json({ limit: '100mb', extended: true }));

app.post('/api/v1/upload', upload.upload.single('file'), (req, res, next) => {
  var path = "https://img.bismart.lk/uploads/";
  try {
    return res.status(200).json({
      sucess: true,
      message: 'File uploded successfully',
      fileName: path + req.file.filename
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: 'File uplod failed'
    });
  }
});

var router = express.Router();

app.use('/api/' + constants.version, router);
router.use(checkToken);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// index route
app.get('/NodeApp', (req, res) => {
  res.send('Invalid endpoint');
});

var ApiConfig = {
  app: app
}

//initialize routes
AuthenticRoute.init(router);
ActionsRoute.init(router);

module.exports = ApiConfig;
