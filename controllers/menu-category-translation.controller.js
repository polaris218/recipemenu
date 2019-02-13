"use strict";

const MenuCategoryTranslation = require('../models/menu-category-translation.model');

class MenuCategoryTranslationController {

}

MenuCategoryTranslationController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    MenuCategoryTranslation.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'MenuCategoryTranslation successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuCategoryTranslation get failed', obj: err });
    });
};

MenuCategoryTranslationController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuCategoryTranslation.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuCategoryTranslation successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuCategoryTranslation creation failed', obj: err });
    });
};

MenuCategoryTranslationController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuCategoryTranslation.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuCategoryTranslation successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuCategoryTranslation update failed', obj: err });
    });
};

MenuCategoryTranslationController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuCategoryTranslation.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuCategoryTranslation successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuCategoryTranslation remove failed', obj: err });
    });
};

module.exports = MenuCategoryTranslationController;