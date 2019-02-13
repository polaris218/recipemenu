"use strict";

const cloudinary = require('cloudinary');
const constants = require('../constants');

cloudinary.config({
    cloud_name: constants.CLOUDINARY_NAME,
    api_key: constants.CLOUDINARY_API_KEY,
    api_secret: constants.CLOUDINARY_SECRET
});

let ImageUploadUtils = {
    upload: function(data, cb) {
        cloudinary.v2.uploader.upload(data.url, {
            resource_type: "image",
            chunk_size: 50000000,
            public_id: data.file.name
        }, function(err, res) {
            console.log(err)
            console.log(res)
            if (typeof cb === 'function') {
                cb(res);
            }
        });
    }
};

module.exports = ImageUploadUtils;