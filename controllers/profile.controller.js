"use strict";

const Profile = require('../models/profile.model');

class ProfileController {

}

ProfileController.get = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    if (req.decoded) {
        Profile.getByEmail(req.decoded).then(output => {
            console.log(output);
            res.status(200).json({ success: true, message: 'Profile successfully fetched', obj: output });
        }).catch(err => {
            console.error(err);
            res.status(204).send({ success: false, message: 'Profile get failed', obj: err });
        });
    } else {
        Profile.getAll().then(output => {
            console.log(output);
            res.status(200).json({ success: true, message: 'Profile successfully fetched', obj: output });
        }).catch(err => {
            console.error(err);
            res.status(204).send({ success: false, message: 'Profile get failed', obj: err });
        });
    }
};

ProfileController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.decoded) {
        Profile.update(req.decoded, req.body.updates).then(output => {
            console.log(output);
            res.status(201).json({ success: true, message: 'Profile successfully updated', obj: output });
        }).catch(err => {
            console.error(err);
            res.status(204).send({ success: false, message: 'Profile update failed', obj: err });
        });
    } else {
        Profile.update(req.body.email, req.body.updates).then(output => {
            console.log(output);
            res.status(201).json({ success: true, message: 'Profile successfully updated', obj: output });
        }).catch(err => {
            console.error(err);
            res.status(204).send({ success: false, message: 'Profile update failed', obj: err });
        });
    }
};

module.exports = ProfileController;