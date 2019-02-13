"use strict";

const MenuTranslation = require('../models/menu-translation.model');

class MenuTranslationController {

}

MenuTranslationController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    MenuTranslation.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'MenuTranslation successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuTranslation get failed', obj: err });
    });
};

MenuTranslationController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuTranslation.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuTranslation successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuTranslation creation failed', obj: err });
    });
};

MenuTranslationController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuTranslation.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuTranslation successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuTranslation update failed', obj: err });
    });
};

MenuTranslationController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuTranslation.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuTranslation successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuTranslation remove failed', obj: err });
    });
};

module.exports = MenuTranslationController;