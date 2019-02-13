"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

const Language = require('./language.model');

// Create new language in the database
// Returns a resolved Promise containing its id
let MenuLanguage = class {

};

MenuLanguage.create = (obj) => {
  let language = obj;
  language.Date = dateUtils.toMysqlDate(new Date());

  console.log(language);
  return db('MenuLanguage').insert(language).returning('MenuLanguageID');
};


// Update new language in the database
// Returns a resolved Promise containing the new language
MenuLanguage.update = (id, obj) => {
  let language = obj;
  language.DateUpdated = dateUtils.toMysqlDate(new Date());

  return MenuLanguage.getById(id).update(language).then(res => {
    return MenuLanguage.getById(id);
  });
};

// Remove language in the database
// Returns a resolved Promise containing the number of rows affected
MenuLanguage.remove = (id) => {
  return db('MenuLanguage').where({
    MenuLanguageID: id
  }).first('*').del();
};

// Get a language by id
// Returns a Promise
MenuLanguage.getById = (id) => {
  return db('MenuLanguage').where({
    MenuLanguageID: id
  }).first('*');
};


// Get a language by conditions object:
// {
//    key: value
// }
// Returns a Promise
MenuLanguage.get = (conditions) => {
  return db('MenuLanguage').where(conditions).select('*');
};

MenuLanguage.getWithDetails = (conditions) => {
  return db('MenuLanguage').where(conditions).select('*').then(menuLanguages => {
    if (!menuLanguages || menuLanguages.length <= 0) {
      return Promise.resolve(menuLanguages);
    }

    return Promise.all(menuLanguages.map(menuLanguage => {
      return createMenuLanguage(menuLanguage);
    }));
  });
};

// Get all languages
// Returns a Promise
MenuLanguage.getAll = () => {
  return db.select('*').from('MenuLanguage');
};

// Get all languages per branchID
// Returns a Promise
MenuLanguage.getAllByBranch = (id) => {
  return db('MenuLanguage').where({
    MenuLanguageID: id
  });
};

function createMenuLanguage (menuLanguage) {
  return new Promise((resolve, reject) => {
    Promise.all([
      Language.getWithDetails({LanguageID: menuLanguage.LanguageID})
    ]).then(res => {
      console.log(res);
      let obj = menuLanguage;
      obj.Language = res[0];
      resolve(obj);
    }).catch(err => {
      reject(err);
    });
  });
}


module.exports = MenuLanguage;
