"use strict";

const constants = require('../constants');
const jwt = require('jsonwebtoken');

let authToken = (req, res, next) => {

  // Check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // Decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, constants.JWT_SECRET, {
      //maxAge: "1d"
    }, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.', obj: err });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    console.log(req.path);
    if (req.path === '/profile') {
      next();
    } else {
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
  }
};

module.exports = authToken;