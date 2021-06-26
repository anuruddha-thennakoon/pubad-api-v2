const jwt = require('jsonwebtoken');
var store = require('localStorage');
var constants = require('../config/constants');

module.exports = function checkToken(req, res, next) {
  var appToken = req.headers['app-token'];

  if (constants.appToken == appToken) {

    /**
     * Check session-token
     * Create company
     */
    if (
      req.originalUrl == '/api/v1/company' ||
      req.originalUrl == '/api/v1/company-profiles'
    ) {
      //for testing
      next();

      // var token = req.headers['session-token'];
      // if (token) {
      //   jwt.verify(token, 'my_secret_key', (err, decode) => {
      //     if (err) {
      //       res.json({
      //         "status": 401,
      //         "message": "INVALID SESSION TOKEN",
      //         "error": err.message
      //       });
      //     } else {
      //       next();
      //     }
      //   })
      // } else {
      //   res.json({
      //     "status": 401,
      //     "message": "NO SESSION TOKEN PROVIDED",
      //     "error": "Unauthorized"
      //   });
      // }

    } else {
      next();
    }

  } else {
    res.json({
      "status": 401,
      "message": "NO APP TOKEN PROVIDED",
      "error": "Unauthorized"
    });
  }

}


