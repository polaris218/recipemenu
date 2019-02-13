"use strict";

const Subscription = require('../models/subscription.model');

class SubscriptionController {

}

SubscriptionController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Subscription.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Subscription successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Subscription get failed', obj: err });
    });
};

SubscriptionController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Subscription.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Subscription successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Subscription creation failed', obj: err });
    });
};

SubscriptionController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Subscription.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Subscription successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Subscription update failed', obj: err });
    });
};

SubscriptionController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Subscription.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Subscription successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Subscription remove failed', obj: err });
    });
};

module.exports = SubscriptionController;