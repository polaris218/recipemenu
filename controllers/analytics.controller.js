"use strict";

const Analytics = require('../models/analytics.model');

class AnalyticsController {

}

AnalyticsController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Analytics.getAll(req.decoded).then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Analytics successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Analytics get failed', obj: err });
    });
};

AnalyticsController.post = (req, res) => {
    console.log(req, 'test')
    res.setHeader('Content-Type', 'application/json');
    Analytics.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Analytics successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Analytics creation failed', obj: err });
    });
};

module.exports = AnalyticsController;