'use strict';
const nodemailer = require('nodemailer');
const constants = require('../constants');
const Company = require('../models/company.model');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
class CheckResetCodeController {

}

CheckResetCodeController.post = (req, res) => {
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    var decrypted = cryptr.decrypt(req.body.code);
    console.log(decrypted)
    Company.getByEmail(decrypted).then(company => {
        if (!company) {
            res.status(400).json({
                success: false,
                error: "Verification link is invalid."
            });
        } else if (company.resetcodevalidity > Date.now()) {
            res.status(200).json({
                success: true
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Verification link has expired."
            });
        }
    }).catch(err => {
        res.status(400).json({
            success: false,
            error: err.error
        });
    })
};

CheckResetCodeController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var decrypted = cryptr.decrypt(req.body.code);
    Company.getByEmail(decrypted).then(company => {
        console.log(company)
        if (!company) {
            res.status(400).json({
                success: false,
                error: "Error while updating password.."
            });
        } else {
            Company.updatePwd(company.CompanyID, req.body.auth).then(company => {
                if (!company) {
                    res.status(400).json({ success: false, message: 'Error while updating your password.' });
                    throw new Error(400);
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Your password das been updated.'
                    });
                }
            })
        }
    }).catch(err => {
        res.status(400).json({
            success: false,
            error: err.error
        });
    })
};

module.exports = CheckResetCodeController;