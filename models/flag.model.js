"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

///////////////////
// TODO: Permissions
// Add a flag should only be accessible from OM admins
///////////////////

// Create new flag in the database
// Returns a resolved Promise containing its id
let Flag = class {

};

Flag.create = (obj) => {
  let flag = obj;
  flag.Date = dateUtils.toMysqlDate(new Date());

  console.log(flag);
  return db('Flag').insert(flag).returning('FlagID');
};

// Get a flag by id
// Returns a Promise
Flag.getById = (id) => {
  return db('Flag').where({
    FlagID: id
  }).first('*');
};


// Get a flag by conditions object:
// {
//    key: value
// }
// Returns a Promise
Flag.get = (conditions) => {
  return db('Flag').where(conditions).select('*');
};

// Get all flags
// Returns a Promise
Flag.getAll = () => {
  return db.select('*').from('Flag');
};


module.exports = Flag;
