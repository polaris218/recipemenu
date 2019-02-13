"use strict";

const jwt = require('jsonwebtoken');
const constants = require('../constants');
const Company = require('../models/company.model');

class AuthController {

}

AuthController.post = (req, res) => {
    console.log(req.query);
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    const data = JSON.parse(JSON.stringify(req.body));
    console.log(data);
    const email = data.auth.Email;
    const pwd = data.auth.Pwd;

    Company.emailExists(email).then(emailExists => {
        console.log(emailExists);
        if (!emailExists) {
            res.status(400).json({ success: false, message: 'Invalid Email/Password.' });
            throw new Error(400);
        }

        return Company.auth(email, pwd);
    }).then((isPwdValid) => {
        if (!isPwdValid) {
            res.status(400).json({ success: false, message: 'Invalid Email/Password.' });
            throw new Error(400);
        }

        let token = jwt.sign(email, constants.JWT_SECRET/*, {
          exp: (Math.floor(Date.now() / 1000) + (60 * 60)) * 24 // Expires in 24 hours
        }*/);

        // Return the information including token as JSON
        res.status(200).json({
          success: true,
          message: 'Token successfully generated',
          token: token
        });
    }).catch(err => {
        console.error(err);
        // Check if headers are not already sent earlier in the flow
        if (!res.headersSent) {
            res.status(204).json({ success: false, message: 'Authentication failed.', obj: err });
        }
    });
};

module.exports = AuthController;