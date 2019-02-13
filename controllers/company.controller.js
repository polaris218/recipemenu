"use strict";

const Company = require('../models/company.model');

class CompanyController {

}

CompanyController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Company.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Company successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Company get failed', obj: err });
    });
};

CompanyController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Company.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Company successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Company creation failed', obj: err });
    });
};

CompanyController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Company.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Company successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Company update failed', obj: err });
    });
};

module.exports = CompanyController;