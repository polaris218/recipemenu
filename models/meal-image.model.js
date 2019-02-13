"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

// Create new image in the database
// Returns a resolved Promise containing its id
let MealImage = class {

};

MealImage.create = (obj) => {
    let image = obj;
    image.Date = dateUtils.toMysqlDate(new Date());

    console.log(image);
    return db('MealImage').insert(image).returning('MealImageID');
};

MealImage.createAll = (images) => {
    if (!images || images.length <= 0) {
        console.error('No images specified');
        return Promise.resolve([]);
    }

    return Promise.all(images.map(image => {
        console.log(image);
        return MealImage.create({
            MealID: image.MealID || image.mealId,
            Path: image.Path || image.imgPath,
            Caption: image.Caption || image.caption,
            AltDesc: image.AltDesc || image.altDesc
        });
    }));
};


// Update image in the database
// Returns a resolved Promise containing the new cuisine
MealImage.update = (id, obj) => {
    let image = obj;
    image.DateUpdated = dateUtils.toMysqlDate(new Date());

    return MealImage.getById(id).update(image).then(res => {
        return MealImage.getById(id);
    });
};

MealImage.removeSelected = (images, meal) => {
    images = images || [];
    return MealImage.get({ MealID: meal.MealID }).then(res => {
        console.log('res', res, 'res')
        var deletedImages = res.filter(img => !images.find(image => (image.MealImageID || image.id) == (img.MealImageID || img.id)))
        console.log('deletedImages', deletedImages)
        return Promise.all(deletedImages.map(image => {
            let id = image.MealImageID || image.id;
            return MealImage.remove(id);
        }));
    });
}

MealImage.updateAll = (images) => {
    if (!images || images.length <= 0) {
        return Promise.reject('No images specified');
    }

    return Promise.all(images.map(image => {
        let id = image.MealImageID || image.id;
        return MealImage.getById(id).then(res => {
            console.log('mealimage get by id');
            console.log(res);
            if (!res || res.length <= 0) {
                return MealImage.create({
                    MealID: image.MealID || image.mealId,
                    Path: image.Path || image.imgPath,
                    Caption: image.Caption || image.caption,
                    AltDesc: image.AltDesc || image.altDesc
                });
            }

            return MealImage.update(id, {
                MealID: image.MealID || image.mealId,
                Path: image.Path || image.imgPath,
                Caption: image.Caption || image.caption,
                AltDesc: image.AltDesc || image.altDesc
            });
        });
    }));
};



// Remove image in the database
// Returns a resolved Promise containing the number of rows affected
MealImage.remove = (id) => {
    return db('MealImage').where({
        MealImageID: id
    }).first('*').del();
};

// Get an image by id
// Returns a Promise
MealImage.getById = (id) => {
    return db('MealImage').where({
        MealImageID: id
    }).first('*');
};


// Get an image by conditions object:
// {
//    key: value
// }
// Returns a Promise
MealImage.get = (conditions) => {
    return db('MealImage').where(conditions).select('*');
};

// Get all images
// Returns a Promise
MealImage.getAll = () => {
    return db.select('*').from('MealImage');
};


module.exports = MealImage;