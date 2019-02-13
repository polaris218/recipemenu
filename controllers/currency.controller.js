"use strict";

const Currency = require('../models/currency.model');

class CurrencyController {

}

CurrencyController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Currency.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Currency successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Currency get failed', obj: err });
    });
};

CurrencyController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Currency.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Currency successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Currency creation failed', obj: err });
    });
};

CurrencyController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Currency.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Currency successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Currency update failed', obj: err });
    });
};

CurrencyController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Currency.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Currency successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Currency remove failed', obj: err });
    });
};

module.exports = CurrencyController;