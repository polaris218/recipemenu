"use strict";

const Meal = require('../models/meal.model');

class MealController {

}

MealController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Meal.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Meal successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Meal get failed', obj: err });
    });
};

MealController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Meal.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Meal successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Meal creation failed', obj: err });
    });
};

MealController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Meal.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Meal successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Meal update failed', obj: err });
    });
};

MealController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Meal.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Meal successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Meal remove failed', obj: err });
    });
};

MealController.removeAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Meal.removeSelected(req.body, req.body.meals).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Meal successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Meal remove failed', obj: err });
    });
};

module.exports = MealController;