"use strict";

const CategoryCustom = require('../models/category-custom.model');

class CategoryCustomController {

}

CategoryCustomController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    CategoryCustom.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'CategoryCustom successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'CategoryCustom get failed', obj: err });
    });
};

CategoryCustomController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    CategoryCustom.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'CategoryCustom successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'CategoryCustom creation failed', obj: err });
    });
};

CategoryCustomController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    CategoryCustom.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'CategoryCustom successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'CategoryCustom update failed', obj: err });
    });
};

CategoryCustomController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    CategoryCustom.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'CategoryCustom successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'CategoryCustom remove failed', obj: err });
    });
};

module.exports = CategoryCustomController;