"use strict";

const ImageUpload = require('../models/image-upload.model');

class ImageUploadController {

}

ImageUploadController.post = (req, res) => {
    //console.log(req.body);
    res.setHeader('Content-Type', 'application/json');

    ImageUpload.create(req.body.obj).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'ImageUpload successfully created', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'ImageUpload get failed', obj: err });
    });
};

ImageUploadController.put = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    ImageUpload.update(req.body.email, req.body.updates).then(output => {
        console.log(output);
        res.status(201).json({ success: true, message: 'ImageUpload successfully updated', obj: output });
    }).catch(err => {
        console.error(err);
        res.status(204).send({ success: false, message: 'ImageUpload update failed', obj: err });
    });
};

module.exports = ImageUploadController;