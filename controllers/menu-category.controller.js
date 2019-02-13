"use strict";

const MenuCategory = require('../models/menu-category.model');

class MenuCategoryController {

}

MenuCategoryController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    MenuCategory.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'MenuCategory successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuCategory get failed', obj: err });
    });
};

MenuCategoryController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuCategory.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuCategory successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuCategory creation failed', obj: err });
    });
};

MenuCategoryController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuCategory.update(req.body.id, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuCategory successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuCategory update failed', obj: err });
    });
};

MenuCategoryController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuCategory.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuCategory successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuCategory remove failed', obj: err });
    });
};

MenuCategoryController.removeAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    MenuCategory.removeSelected(req.body, req.body.categories).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'MenuCategory successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'MenuCategory remove failed', obj: err });
    });
};


module.exports = MenuCategoryController;