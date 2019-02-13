"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');
const geoUtils = require('../shared/geo-utils');

const BranchContact = require('./branch-contact.model');
const BranchCuisine = require('./branch-cuisine.model');
const BranchCurrency = require('./branch-currency.model');
const BranchLanguage = require('./branch-language.model');
const BranchImage = require('./branch-image.model');
const Menu = require('./menu.model');

// Create new branch in the database
// Returns a resolved Promise containing its id
let Branch = class {

};

Branch.create = (obj) => {
  let branch = obj;
  branch.Date = dateUtils.toMysqlDate(new Date());

  console.log('branch create');
  console.log(branch);

  if (branch.Address) {
    let address = branch.Address +
      (branch.Country ? ' ' + branch.Country : '') +
      (branch.City ? ' ' + branch.City : '');

    if (!address) {
      return db('Branch').insert(branch).returning('BranchID');
    }

    return geoUtils.convertToLatLong(address).then(({ latitude, longitude }) => {
      console.log(latitude, longitude);
      if (latitude && longitude) {
        branch.Latitude = latitude;
        branch.Longitude = longitude;
      }

      console.log(branch);
      return db('Branch').insert(branch).returning('BranchID');
    }).catch(err => {
      console.log(err);
      return db('Branch').insert(branch).returning('BranchID');
    });
  }

  console.log(branch);
  return db('Branch').insert(branch).returning('BranchID');
};

Branch.createWithDetails = (obj) => {
  let insertNewId = (id, arr) => {
    if (!id) {
      return arr;
    }

    let newObject = arr.map(item => {
      if (!item.BranchID) {
        let newItem = item;
        newItem.BranchID = id;
        return newItem;
      }

      return item;
    });

    console.log('insertNewId');
    console.log(newObject);

    return newObject;
  };

  let branch = obj;

  return Branch.create({
    Address: branch.Address,
    City: branch.City,
    CompanyID: branch.CompanyID,
    Country: branch.Country,
    Email: branch.Email,
    Tel: branch.Tel,
    Name: branch.Name,
    HasHeadquarters: branch.HasHeadquarters
  }).then(res => {
    console.log(res);
    let id = res[0];

    return Promise.all([
      BranchContact.createAll(insertNewId(id, branch.contacts)),
      BranchCuisine.createAll(insertNewId(id, branch.cuisines)),
      BranchCurrency.createAll(insertNewId(id, branch.currencies)),
      BranchLanguage.createAll(insertNewId(id, branch.languages)),
      BranchImage.createAll(insertNewId(id, branch.images))
    ]).then(res => {
      console.log(res);

      let tmp = branch;
      tmp.contacts = res[0][0];
      tmp.cuisines = res[0][1];
      tmp.currencies = res[0][2];
      tmp.languages = res[0][3];
      tmp.images = res[0][4];

      console.log('finalobj created');
      console.log(tmp);

      //return Promise.resolve(tmp);
      return Branch.getById(id);
    });
  }).catch(err => {
    return Promise.reject(err);
  });
};


// Update branch in the database
// Returns a resolved Promise containing the new branch
Branch.update = (id, obj) => {
  let branch = obj;
  branch.DateUpdated = dateUtils.toMysqlDate(new Date());

  return Branch.getById(id).update(branch).then(res => {
    return Branch.getById(id);
  });
};

// Returns a resolved Promise containing the new branch
Branch.updateWithDetails = (id, obj) => {
  let insertNewId = (id, arr) => {
    if (!id) {
      return arr;
    }

    let newObject = arr.map(item => {
      if (!item.BranchID) {
        let newItem = item;
        newItem.BranchID = id;
        return newItem;
      }

      return item;
    });

    console.log('insertNewId');
    console.log(newObject);

    return newObject;
  };

  console.log('BRANCH UPDATE WITH DETAILS');
  console.log(id, obj);
  let branch = obj;
  branch.DateUpdated = dateUtils.toMysqlDate(new Date());

  return Promise.all([
    BranchContact.updateAll(branch.contacts),
    BranchCuisine.updateAll(insertNewId(id, branch.cuisines)),
    BranchCurrency.updateAll(insertNewId(id, branch.currencies)),
    BranchLanguage.updateAll(insertNewId(id, branch.languages)),
    BranchImage.removeSelected(branch.images, branch),
    BranchImage.updateAll(branch.images)
  ]).then(res => {
    console.log(res);
    let tmp = branch;
    tmp.contacts = res[0][0];
    tmp.cuisines = res[0][1];
    tmp.currencies = res[0][2];
    tmp.languages = res[0][3];
    tmp.images = res[0][5];

    console.log('finalobj');
    console.log(tmp);

    return Branch.getById(id).update({
      Address: branch.Address,
      City: branch.City,
      Country: branch.Country,
      Email: branch.Email,
      HasHeadquarters: branch.HasHeadquarters,
      Name: branch.Name,
      Tel: branch.Tel
    }).then(res => {
      //return Branch.getById(id);
      return Promise.resolve(tmp);
    });
  }).catch(err => {
      return Promise.reject(err);
  });
};



// Remove branch in the database
// Returns a resolved Promise containing the number of rows affected
Branch.remove = (id) => {
  return db('Branch').where({
    BranchID: id
  }).first('*').del();
};

// Get a branch by id
// Returns a Promise
Branch.getById = (id) => {
  return db('Branch').where({
    BranchID: id
  }).first('*');
};


// Get a branch by conditions object:
// {
//    key: value
// }
// Returns a Promise
Branch.get = (conditions) => {
  return db('Branch').where(conditions).select('*');
};

Branch.getWithEntities = (conditions) => {
  return db('Branch').where(conditions).select('*').then(branches => {
    return Promise.all(branches.map(branch => {
      return createBranchContainer(branch);
    }));
  });
};

function createBranchContainer (branch) {
  return new Promise((resolve, reject) => {
    Promise.all([
      BranchContact.get({BranchID: branch.BranchID}),
      BranchCuisine.getWithDetails({BranchID: branch.BranchID}),
      BranchCurrency.getWithDetails({BranchID: branch.BranchID}),
      BranchLanguage.getWithDetails({BranchID: branch.BranchID}),
      BranchImage.get({BranchID: branch.BranchID}),
      Menu.getWithDetails({BranchID: branch.BranchID})
    ]).then(res => {
      console.log(res);
      let obj = branch;
      obj.contacts = res[0];
      obj.cuisines = res[1];
      obj.currencies = res[2];
      obj.languages = res[3];
      obj.images = res[4];
      obj.menus = res[5];

      resolve(obj);
    }).catch(err => {
      reject(err);
    });
  });
}

// Get all branches
// Returns a Promise
Branch.getAll = () => {
  return db.select('*').from('Branch');
};


module.exports = Branch;
