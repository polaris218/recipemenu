"use strict";

const CategoryStandard = require('../models/category-standard.model');

class CategoryStandardController {

}

CategoryStandardController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    CategoryStandard.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'CategoryStandard successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'CategoryStandard get failed', obj: err });
    });
};

CategoryStandardController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    CategoryStandard.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'CategoryStandard successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'CategoryStandard creation failed', obj: err });
    });
};

CategoryStandardController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    CategoryStandard.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'CategoryStandard successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'CategoryStandard update failed', obj: err });
    });
};

CategoryStandardController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    CategoryStandard.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'CategoryStandard successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'CategoryStandard remove failed', obj: err });
    });
};

module.exports = CategoryStandardController;