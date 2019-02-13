"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

const Currency = require('./currency.model');

// Create new branch currency in the database
// Returns a resolved Promise containing its id
let BranchCurrency = class {

};

BranchCurrency.create = (obj) => {
  let currency = obj;
  currency.Date = dateUtils.toMysqlDate(new Date());

  console.log(currency);
  return db('BranchCurrency').insert(currency).returning('BranchCurrencyID');
};

BranchCurrency.createAll = (currencies) => {
  if (!currencies || currencies.length <= 0) {
    console.error('No currencies specified');
    return Promise.resolve([]);
  }

  return Promise.all(currencies.map(currency => {
    return BranchCurrency.create({
      BranchID: currency.BranchID,
      CurrencyID: currency.CurrencyID
    });
  }));
};


// Update currency in the database
// Returns a resolved Promise containing the new currency
BranchCurrency.update = (id, obj) => {
  let currency = obj;
  currency.DateUpdated = dateUtils.toMysqlDate(new Date());

  return BranchCurrency.getById(id).update(currency).then(res => {
    return BranchCurrency.getById(id);
  });
};

BranchCurrency.updateAll = (currencies) => {
  if (!currencies || currencies.length <= 0) {
    console.error('No currencies specified');
    return Promise.resolve([]);
  }

  return Promise.all(currencies.map(currency => {
    //
    // If the item is not already is in the db check if
    // the same values are already somewhere
    //

    return BranchCurrency.get({
      BranchID: currency.BranchID
    }).then(branchCurrencies => {
      if (!branchCurrencies || branchCurrencies.length <= 0) {
        return BranchCurrency.create({
          BranchID: currency.BranchID,
          CurrencyID: currency.CurrencyID
        });
      }

      return Promise.all(branchCurrencies.map(branchCurrency => {
        return BranchCurrency.remove(branchCurrency.BranchCurrencyID);
      })).then(res => {
        console.log(res);

        return BranchCurrency.create({
          BranchID: currency.BranchID,
          CurrencyID: currency.CurrencyID
        });
      });
    });
  }));
};



// Remove currency in the database
// Returns a resolved Promise containing the number of rows affected
BranchCurrency.remove = (id) => {
  return db('BranchCurrency').where({
    BranchCurrencyID: id
  }).first('*').del();
};

// Get a currency by id
// Returns a Promise
BranchCurrency.getById = (id) => {
  return db('BranchCurrency').where({
    BranchCurrencyID: id
  }).first('*');
};


// Get a currency by conditions object:
// {
//    key: value
// }
// Returns a Promise
BranchCurrency.get = (conditions) => {
  return db('BranchCurrency').where(conditions).select('*');
};

BranchCurrency.getWithDetails = (conditions) => {
  return db('BranchCurrency').where(conditions).select('*').then(currencies => {
    if (!currencies || currencies.length <= 0) {
      return Promise.resolve(currencies);
    }

    return Promise.all(currencies.map(currency => {
      return createBranchCurrency(currency);
    }));
  });
};

// Get all currencies
// Returns a Promise
BranchCurrency.getAll = () => {
  return db.select('*').from('BranchCurrency');
};

// Get all currencies of a given branch
// Returns a Promise
BranchCurrency.getAllByBranch = (id) => {
  return db('BranchCurrency').where({
    BranchID: id
  });
};


function createBranchCurrency (branchCurrency) {
  return new Promise((resolve, reject) => {
    Promise.all([
      Currency.getById(branchCurrency.CurrencyID)
    ]).then(res => {
      console.log(res);
      let obj = branchCurrency;
      obj.Currency = res[0];
      resolve(obj);
    }).catch(err => {
      reject(err);
    });
  });
}


module.exports = BranchCurrency;
