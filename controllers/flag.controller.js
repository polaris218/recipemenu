"use strict";

const Flag = require('../models/flag.model');

class FlagController {

}

FlagController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Flag.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Flag successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Flag get failed', obj: err });
    });
};

FlagController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Flag.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Flag successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Flag creation failed', obj: err });
    });
};

module.exports = FlagController;