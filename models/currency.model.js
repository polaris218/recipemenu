"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

///////////////////
// TODO: Permissions
// Add a currency should only be accessible from OM admins
///////////////////

// Create new currency in the database
// Returns a resolved Promise containing its id
let Currency = class {

};

Currency.create = (obj) => {
  let currency = obj;
  currency.Date = dateUtils.toMysqlDate(new Date());

  console.log(currency);
  return db('Currency').insert(currency).returning('CurrencyID');
};


// Update new currency in the database
// Returns a resolved Promise containing the new language
Currency.update = (id, obj) => {
  let currency = obj;
  currency.DateUpdated = dateUtils.toMysqlDate(new Date());

  return Currency.getById(id).update(currency).then(res => {
    return Currency.getById(id);
  });
};

// Remove currency in the database
// Returns a resolved Promise containing the number of rows affected
Currency.remove = (id) => {
  return db('Currency').where({
    CurrencyID: id
  }).first('*').del();
};

// Get a currency by id
// Returns a Promise
Currency.getById = (id) => {
  return db('Currency').where({
    CurrencyID: id
  }).first('*');
};


// Get a currency by conditions object:
// {
//    key: value
// }
// Returns a Promise
Currency.get = (conditions) => {
  return db('Currency').where(conditions).select('*');
};

// Get all currencies
// Returns a Promise
Currency.getAll = () => {
  return db.select('*').from('Currency');
};


module.exports = Currency;
