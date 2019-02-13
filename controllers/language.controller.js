"use strict";

const Language = require('../models/language.model');

class LanguageController {

}

LanguageController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Language.getAllWithDetails().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Language successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Language get failed', obj: err });
    });
};

LanguageController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Language.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Language successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Language creation failed', obj: err });
    });
};

LanguageController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Language.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Language successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Language update failed', obj: err });
    });
};

module.exports = LanguageController;