"use strict";

const BranchLanguage = require('../models/branch-language.model');

class BranchLanguageController {

}

BranchLanguageController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    BranchLanguage.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'BranchLanguage successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchLanguage get failed', obj: err });
    });
};

BranchLanguageController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchLanguage.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchLanguage successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchLanguage creation failed', obj: err });
    });
};

BranchLanguageController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchLanguage.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchLanguage successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchLanguage update failed', obj: err });
    });
};

BranchLanguageController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    BranchLanguage.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'BranchLanguage successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'BranchLanguage remove failed', obj: err });
    });
};

module.exports = BranchLanguageController;