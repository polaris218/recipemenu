"use strict";

const MealTranslation = require('../models/meal-translation.model');

class MealTranslationController {

}

MealTranslationController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    MealTranslation.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'MealTranslation successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MealTranslation get failed', obj: err });
    });
};

MealTranslationController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MealTranslation.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MealTranslation successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MealTranslation creation failed', obj: err });
    });
};

MealTranslationController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MealTranslation.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MealTranslation successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MealTranslation update failed', obj: err });
    });
};

MealTranslationController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MealTranslation.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MealTranslation successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MealTranslation remove failed', obj: err });
    });
};

module.exports = MealTranslationController;