const authenticService = require('../services/authentic.service');
var schema = require('../schema/loginValidationSchema.json');
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');

function init(router) {
  router.route('/admin-login')
    .post(adminLogin);
  router.route('/admin-register')
    .post(adminRegister);
}

function adminLogin(req, res) {
  var logData = req.body;

  //Validating the input entity
  // var json_format = iValidator.json_schema(schema.postSchema, authenticData, "authentic");
  // if (json_format.valid == false) {
  //   return res.status(422).send(json_format.errorMessage);
  // }

  authenticService.adminLogin(logData).then((data) => {
    if (data.success) {
      res.status(200).send(data);
    } else {
      res.status(401).send(data);
    }
  }).catch((err) => {
    console.log(err)
    res.status(400).send(err);
  });
}

function adminRegister(req, res) {
  var regData = req.body;

  //Validating the input entity
  // var json_format = iValidator.json_schema(schema.postSchema, authenticData, "authentic");
  // if (json_format.valid == false) {
  //   return res.status(422).send(json_format.errorMessage);
  // }

  authenticService.adminRegister(regData).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(400).send(err);
  });
}

module.exports.init = init;



