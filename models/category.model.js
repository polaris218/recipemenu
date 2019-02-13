"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

///////////////////
// TODO: Permissions
// Add a category should only be accessible from OM admins
///////////////////

// Create new category in the database
// Returns a resolved Promise containing its id
let Category = class {

};

Category.create = (obj) => {
  let category = obj;
  category.Date = dateUtils.toMysqlDate(new Date());

  console.log(category);
  return db('Category').insert(category).returning('CategoryID');
};


// Update new category in the database
// Returns a resolved Promise containing the new language
Category.update = (id, obj) => {
  let category = obj;
  category.DateUpdated = dateUtils.toMysqlDate(new Date());

  return Category.getById(id).update(category).then(res => {
    return Category.getById(id);
  });
};

// Remove category in the database
// Returns a resolved Promise containing the number of rows affected
Category.remove = (id) => {
  return db('Category').where({
    CategoryID: id
  }).first('*').del();
};

// Get a category by id
// Returns a Promise
Category.getById = (id) => {
  return db('Category').where({
    CategoryID: id
  }).first('*');
};

// Generate an auto-incremented id
// (Should be only used while creating a new Category Subtype: CategoryStandard, CategoryCustom, etc...)
Category.generateId = () => {
  return Category.create({});
};


// Get a category by conditions object:
// {
//    key: value
// }
// Returns a Promise
Category.get = (conditions) => {
  return db('Category').where(conditions).select('*');
};

// Get all categories
// Returns a Promise
Category.getAll = () => {
  return db.select('*').from('Category');
};


module.exports = Category;
