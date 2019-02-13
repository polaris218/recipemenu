"use strict";

const Menu = require('../models/menu.model');

class MenuController {

}

MenuController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    Menu.getAll().then(output => {
        console.log(output);
        res.status(200).json({ success: true, message: 'Menu successfully fetched', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Menu get failed', obj: err });
    });
};

MenuController.post = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Menu.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Menu successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Menu creation failed', obj: err });
    });
};

MenuController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var MenuID = req.body.id || req.body.MenuID
    Menu.update(MenuID, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Menu successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Menu update failed', obj: err });
    });
};

MenuController.remove = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Menu.remove(req.body.id).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'Menu successfully removed', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'Menu remove failed', obj: err });
    });
};

module.exports = MenuController;