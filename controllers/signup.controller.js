"use strict";

const jwt = require('jsonwebtoken');
const constants = require('../constants');
const Company = require('../models/company.model');

class SignupController {

}

SignupController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const data = JSON.parse(JSON.stringify(req.body));
    var body = {
        "Name": data.auth.CompanyName,
        "Username": data.auth.Name + " " + data.auth.Surname,
        "Pwd":data.auth.Pwd,
        "Email": data.auth.Email,
        "country": data.auth.Country
    }
    console.log(body);

    Company.emailExists(body.Email).then(emailExists => {
        console.log(emailExists);
        if (emailExists) {
            res.status(400).json({ success: false, message: 'Email already in use.' });
            throw new Error(400);
        }
        else{
            Company.create(body).then(company => {
                console.log("company created");
                if (!company) {
                    res.status(400).json({ success: false, message: 'Error while signing up the user.' });
                    throw new Error(400);
                }
                let token = jwt.sign(body.Email, constants.JWT_SECRET/*, {
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
        }
    }).catch(err => {
        console.error(err);
        // Check if headers are not already sent earlier in the flow
        if (!res.headersSent) {
            res.status(204).json({ success: false, message: 'Authentication failed.', obj: err });
        }
    });
};

module.exports = SignupController;