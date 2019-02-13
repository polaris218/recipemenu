"use strict";

const MealImage = require('../models/meal-image.model');

class MealImageController {

}

MealImageController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    MealImage.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'MealImage successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MealImage get failed', obj: err });
    });
};

MealImageController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MealImage.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MealImage successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MealImage creation failed', obj: err });
    });
};

MealImageController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MealImage.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MealImage successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MealImage update failed', obj: err });
    });
};

MealImageController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MealImage.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MealImage successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MealImage remove failed', obj: err });
    });
};

module.exports = MealImageController;