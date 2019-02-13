"use strict";

const TranslationCallback = require('../models/translation-callback.model');

class TranslationCallbackController {

}

/*
TranslationCallbackController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    TranslationCallback.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'MenuTranslation successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuTranslation get failed', obj: err });
    });
};
*/

TranslationCallbackController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    console.log(req);
    console.log(req.body);

    TranslationCallback.create(req.query, req.body).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'TranslationCallback successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'TranslationCallback creation failed', obj: err });
    });
};

module.exports = TranslationCallbackController;