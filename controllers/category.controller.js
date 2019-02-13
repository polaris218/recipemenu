"use strict";

const Category = require('../models/category.model');

class CategoryController {

}

CategoryController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Category.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Category successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Category get failed', obj: err });
    });
};

CategoryController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Category.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Category successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Category creation failed', obj: err });
    });
};

CategoryController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Category.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Category successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Category update failed', obj: err });
    });
};

CategoryController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Category.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Category successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Category remove failed', obj: err });
    });
};

module.exports = CategoryController;