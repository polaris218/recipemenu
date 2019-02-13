"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

const Category = require('./category.model');

///////////////////
// TODO: Permissions
// Add a CategoryCustom should only be accessible from OM admins
///////////////////

// Create new category in the database
// Returns a resolved Promise containing its id
let CategoryCustom = class {

};

CategoryCustom.create = (obj) => {
  // Generate a new category id and then use that id to create the CategoryStandard.
  return Category.generateId().then((id) => {
    let category = obj;
    category.CategoryCustomID = id;
    category.Date = dateUtils.toMysqlDate(new Date());

    console.log(category);
    return db('CategoryCustom').insert(category).returning('CategoryCustomID');
  });
};


// Update new category in the database
// Returns a resolved Promise containing the new language
CategoryCustom.update = (id, obj) => {
  let category = obj;
  category.DateUpdated = dateUtils.toMysqlDate(new Date());

  return CategoryCustom.getById(id).update(category).then(res => {
    return CategoryCustom.getById(id);
  });
};


// Remove category in the database
// Returns a resolved Promise containing the number of rows affected
CategoryCustom.remove = (id) => {
  // Grab the CategoryID so we can delete the corresponding Category row later
  return CategoryCustom.getById(id).then(res => {
    return Category.remove(res.CategoryID);
  }).then((res) => {
    return CategoryCustom.getById(id).del();
  });
};

// Get a category by id
// Returns a Promise
CategoryCustom.getById = (id) => {
  return db('CategoryCustom').where({
    CategoryCustomID: id
  }).first('*');
};


// Get a category by conditions object:
// {
//    key: value
// }
// Returns a Promise
CategoryCustom.get = (conditions) => {
  return db('CategoryCustom').where(conditions).select('*');
};

// Get all categories
// Returns a Promise
CategoryCustom.getAll = () => {
  return db.select('*').from('CategoryCustom');
};

// Get all Categories Custom by BranchID
// Returns a Promise
CategoryCustom.getAll = (id) => {
  return db.select('CategoryCustom').where({
    BranchID: id
  });
};


module.exports = CategoryCustom;
