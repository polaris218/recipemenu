"use strict";

const BranchCuisine = require('../models/branch-cuisine.model');

class BranchCuisineController {

}

BranchCuisineController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    BranchCuisine.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'BranchCuisine successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchCuisine get failed', obj: err });
    });
};

BranchCuisineController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchCuisine.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchCuisine successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchCuisine creation failed', obj: err });
    });
};

BranchCuisineController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchCuisine.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchCuisine successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchCuisine update failed', obj: err });
    });
};

BranchCuisineController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchCuisine.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchCuisine successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchCuisine remove failed', obj: err });
    });
};

module.exports = BranchCuisineController;