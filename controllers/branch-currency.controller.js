"use strict";

const BranchCurrency = require('../models/branch-currency.model');

class BranchCurrencyController {

}

BranchCurrencyController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    BranchCurrency.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'BranchCurrency successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchCurrency get failed', obj: err });
    });
};

BranchCurrencyController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchCurrency.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchCurrency successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchCurrency creation failed', obj: err });
    });
};

BranchCurrencyController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchCurrency.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchCurrency successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchCurrency update failed', obj: err });
    });
};

BranchCurrencyController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchCurrency.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchCurrency successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchCurrency remove failed', obj: err });
    });
};

module.exports = BranchCurrencyController;