"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

// Create new cuisine language in the database
// Returns a resolved Promise containing its id
let Cuisine = class {

};

Cuisine.create = (obj) => {
  let cuisine = obj;
  cuisine.Date = dateUtils.toMysqlDate(new Date());

  console.log(cuisine);
  return db('Cuisine').insert(cuisine).returning('CuisineID');
};


// Update cuisine in the database
// Returns a resolved Promise containing the new cuisine
Cuisine.update = (id, obj) => {
  let cuisine = obj;
  cuisine.DateUpdated = dateUtils.toMysqlDate(new Date());

  return Cuisine.getById(id).update(cuisine).then(res => {
    return Cuisine.getById(id);
  });
};

// Remove cuisine in the database
// Returns a resolved Promise containing the number of rows affected
Cuisine.remove = (id) => {
  return db('Cuisine').where({
    CuisineID: id
  }).first('*').del();
};

// Get a cuisine by id
// Returns a Promise
Cuisine.getById = (id) => {
  return db('Cuisine').where({
    CuisineID: id
  }).first('*');
};


// Get a cuisine by conditions object:
// {
//    key: value
// }
// Returns a Promise
Cuisine.get = (conditions) => {
  return db('Cuisine').where(conditions).select('*');
};

// Get all cuisines
// Returns a Promise
Cuisine.getAll = () => {
  return db.select('*').from('Cuisine');
};


module.exports = Cuisine;
