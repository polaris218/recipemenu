"use strict";

const Cuisine = require('../models/cuisine.model');

class CuisineController {

}

CuisineController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Cuisine.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Cuisine successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Cuisine get failed', obj: err });
    });
};

CuisineController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Cuisine.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Cuisine successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Cuisine creation failed', obj: err });
    });
};

CuisineController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Cuisine.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Cuisine successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Cuisine update failed', obj: err });
    });
};

CuisineController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Cuisine.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Cuisine successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Cuisine remove failed', obj: err });
    });
};

module.exports = CuisineController;