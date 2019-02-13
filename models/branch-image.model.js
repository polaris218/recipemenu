"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

// Create new image in the database
// Returns a resolved Promise containing its id
let BranchImage = class {

};

BranchImage.create = (obj) => {
  let image = obj;
  image.Date = dateUtils.toMysqlDate(new Date());

  console.log(image);
  return db('BranchImage').insert(image).returning('BranchImageID');
};

BranchImage.createAll = (images) => {
  if (!images || images.length <= 0) {
    console.error('No images specified');
    return Promise.resolve([]);
  }

  return Promise.all(images.map(image => {
    console.log(image);
    return BranchImage.create({
      BranchID: image.BranchID || image.branchId,
      Path: image.Path || image.imgPath,
      Caption: image.Caption || image.caption,
      AltDesc: image.AltDesc || image.altDesc
    });
  }));
};


// Update image in the database
// Returns a resolved Promise containing the new cuisine
BranchImage.update = (id, obj) => {
  let image = obj;
  image.DateUpdated = dateUtils.toMysqlDate(new Date());

  return BranchImage.getById(id).update(image).then(res => {
    return BranchImage.getById(id);
  });
};

BranchImage.removeSelected = (images, branch) => {
  images = images || [];
  return BranchImage.get({BranchID: branch.BranchID}).then(res => {
    console.log('res', res, 'res')
    var deletedImages = res.filter(img=> !images.find(image=> (image.BranchImageID || image.id) == (img.BranchImageID || img.id)))
    console.log('deletedImages', deletedImages)
    return Promise.all(deletedImages.map(image => {
      let id = image.BranchImageID || image.id;
      return BranchImage.remove(id);
    }));
  });
}

BranchImage.updateAll = (images) => {
  if (!images || images.length <= 0) {
    return Promise.reject('No images specified');
  }

  return Promise.all(images.map(image => {
    let id = image.BranchImageID || image.id;
    return BranchImage.getById(id).then(res => {
      console.log('branchimage get by id');
      console.log(res);
      if (!res || res.length <= 0) {
        return BranchImage.create({
          BranchID: image.BranchID || image.branchId,
          Path: image.Path || image.imgPath,
          Caption: image.Caption || image.caption,
          AltDesc: image.AltDesc || image.altDesc
        });
      }

      return BranchImage.update(id, {
        BranchID: image.BranchID || image.branchId,
        Path: image.Path || image.imgPath,
        Caption: image.Caption || image.caption,
        AltDesc: image.AltDesc || image.altDesc
      });
    });
  }));
};



// Remove image in the database
// Returns a resolved Promise containing the number of rows affected
BranchImage.remove = (id) => {
  return db('BranchImage').where({
    BranchImageID: id
  }).first('*').del();
};

// Get an image by id
// Returns a Promise
BranchImage.getById = (id) => {
  return db('BranchImage').where({
    BranchImageID: id
  }).first('*');
};


// Get an image by conditions object:
// {
//    key: value
// }
// Returns a Promise
BranchImage.get = (conditions) => {
  return db('BranchImage').where(conditions).select('*');
};

// Get all images
// Returns a Promise
BranchImage.getAll = () => {
  return db.select('*').from('BranchImage');
};


module.exports = BranchImage;
