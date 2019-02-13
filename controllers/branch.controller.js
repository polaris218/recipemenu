"use strict";

const Branch = require('../models/branch.model');

class BranchController {

}

BranchController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Branch.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Branch successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Branch get failed', obj: err });
    });
};

BranchController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Branch.createWithDetails(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Branch successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Branch creation failed', obj: err });
    });
};

BranchController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Branch.updateWithDetails(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Branch successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Branch update failed', obj: err });
    });
};

BranchController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Branch.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Branch successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Branch remove failed', obj: err });
    });
};

module.exports = BranchController;