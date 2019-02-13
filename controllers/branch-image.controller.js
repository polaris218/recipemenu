"use strict";

const BranchImage = require('../models/branch-image.model');

class BranchImageController {

}

BranchImageController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    BranchImage.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'BranchImage successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchImage get failed', obj: err });
    });
};

BranchImageController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchImage.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchImage successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchImage creation failed', obj: err });
    });
};

BranchImageController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchImage.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchImage successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchImage update failed', obj: err });
    });
};

BranchImageController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchImage.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchImage successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchImage remove failed', obj: err });
    });
};

module.exports = BranchImageController;