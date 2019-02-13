"use strict";

const MenuLanguage = require('../models/menu-language.model');

class MenuLanguageController {

}

MenuLanguageController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    MenuLanguage.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'MenuLanguage successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuLanguage get failed', obj: err });
    });
};

MenuLanguageController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuLanguage.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuLanguage successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuLanguage creation failed', obj: err });
    });
};

MenuLanguageController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuLanguage.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuLanguage successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuLanguage update failed', obj: err });
    });
};

MenuLanguageController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuLanguage.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuLanguage successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuLanguage remove failed', obj: err });
    });
};

module.exports = MenuLanguageController;