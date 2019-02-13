"use strict";

const BranchContact = require('../models/branch-contact.model');

class BranchContactController {

}

BranchContactController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    BranchContact.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'BranchContact successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchContact get failed', obj: err });
    });
};

BranchContactController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchContact.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchContact successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchContact creation failed', obj: err });
    });
};

BranchContactController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchContact.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchContact successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchContact update failed', obj: err });
    });
};

BranchContactController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchContact.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchContact successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchContact remove failed', obj: err });
    });
};

module.exports = BranchContactController;