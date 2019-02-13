"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

const Category = require('./category.model');

///////////////////
// TODO: Permissions
// Add a CategoryStandard should only be accessible from OM admins
///////////////////

// Create new category in the database
// Returns a resolved Promise containing its id
let CategoryStandard = class {

};

CategoryStandard.create = (obj) => {
  // Generate a new category id and then use that id to create the CategoryStandard.
  return Category.generateId().then((id) => {
    let category = obj;
    category.CategoryStandardID = id;
    category.Date = dateUtils.toMysqlDate(new Date());

    console.log(category);
    return db('CategoryStandard').insert(category).returning('CategoryStandardID');
  });
};


// Update new category in the database
// Returns a resolved Promise containing the new category
CategoryStandard.update = (id, obj) => {
  let category = obj;
  category.DateUpdated = dateUtils.toMysqlDate(new Date());

  return CategoryStandard.getById(id).update(category).then(res => {
    return CategoryStandard.getById(id);
  });
};

// Remove category in the database
// Returns a resolved Promise containing the number of rows affected
CategoryStandard.remove = (id) => {
  // Grab the CategoryID so we can delete the corresponding Category row later
  return CategoryStandard.getById(id).then(res => {
    return Category.remove(res.CategoryID);
  }).then((res) => {
    return CategoryStandard.getById(id).del();
  });
};

// Get a category by id
// Returns a Promise
CategoryStandard.getById = (id) => {
  return db('CategoryStandard').where({
    CategoryStandardID: id
  }).first('*');
};


// Get a category by conditions object:
// {
//    key: value
// }
// Returns a Promise
CategoryStandard.get = (conditions) => {
  return db('CategoryStandard').where(conditions).select('*');
};

// Get all categories
// Returns a Promise
CategoryStandard.getAll = () => {
  return db.select('*').from('CategoryStandard');
};


module.exports = CategoryStandard;
