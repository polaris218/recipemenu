'use strict';
const nodemailer = require('nodemailer');
const constants = require('../constants');
const Company = require('../models/company.model');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

class ForgotPasswordController {

}

ForgotPasswordController.post = (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    console.log(data);
    res.setHeader('Content-Type', 'application/json');
    var transporter = nodemailer.createTransport({
        host: 'smtp.123-reg.co.uk',
        auth: {
            user: 'no-reply@one-menu.com',
            pass: 'jtcv+uHr*yd#Q9x6'
        }
    });
    Company.getByEmail(data.auth.Email).then(company => {
        var data = company;
        data.resetcode = cryptr.encrypt(data.Email);
        data.resetcodevalidity = Date.now() + 3600000;
        console.log(data)
        Company.update(data.CompanyID, data).then(com => {
            var mailOptions = {
                from: 'no-reply@one-menu.com',
                to: com.Email,
                subject: 'Account recovery link',
                text: "Dear Customer, \n\nWe've received your password reset request. Please, follow this link to create a new password:\n" +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '#/reset/' + com.resetcode + '\n\n' +
                    "Important note (!!!). If you haven't requested password reset, just ignore this email.\n\nBest Regards,\nOne Menu team"
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Reset link has been sent to your registered email.'
                    });
                }
            });
        }).catch(err => {
            console.log(err)
            res.status(400).json({
                success: false,
                error: err.error
            });
        })
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            success: false,
            error: err.error
        });
    })
};


module.exports = ForgotPasswordController;