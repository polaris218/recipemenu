"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;

const ImageUploadUtils = require('../shared/image-upload-utils');


let ImageUpload = class {

};

ImageUpload.create = (obj) => {
    return new Promise((resolve, reject) => {
        ImageUploadUtils.upload(obj, (res) => {
            if (res) {
                resolve(res);
            } else {
                reject('Error occurred while getting the response from Cloudinary');
            }
        });
    });
};


// Update new menu in the database
// Returns a resolved Promise containing the new language
ImageUpload.update = (id, obj) => {
    /*
  let menu = obj;
  menu.DateUpdated = dateUtils.toMysqlDate(new Date());

  return MenuTranslation.getById(id).update(menu).then(res => {
    return MenuTranslation.getById(id);
  });
*/
};

module.exports = ImageUpload;