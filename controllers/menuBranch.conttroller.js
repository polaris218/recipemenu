"use strict";

const Menu = require('../models/menu.model');

class MenuBranchController {

}

MenuBranchController.get = (req, res) => {
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