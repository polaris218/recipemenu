"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

const MenuCategory = require('./menu-category.model');
const MenuLanguage = require('./menu-language.model');
const MenuTranslation = require('./menu-translation.model');

///////////////////
// TODO: Menu
// Add a menu should only be accessible from OM admins
///////////////////

// Create new menu in the database
// Returns a resolved Promise containing its id
let Menu = class {

};

Menu.create = (obj) => {
  let menu = obj;
  menu.Date = dateUtils.toMysqlDate(new Date());

  console.log(menu);
  return db('Menu').insert(menu).returning('MenuID');
};


// Update new menu in the database
// Returns a resolved Promise containing the new language
Menu.update = (id, obj) => {
  let menu = obj;
  menu.DateUpdated = dateUtils.toMysqlDate(new Date());
  console.log(menu);
  return Menu.getById(id).update(menu).then(res => {
    return Menu.getById(id);
  });
};

// Remove menu in the database
// Returns a resolved Promise containing the number of rows affected
Menu.remove = (id) => {
  return db('Menu').where({
    MenuID: id
  }).first('*').del();
};

// Get a menu by id
// Returns a Promise
Menu.getById = (id) => {
  return db('Menu').where({
    MenuID: id
  }).first('*');
};


// Get a menu by conditions object:
// {
//    key: value
// }
// Returns a Promise
Menu.get = (conditions) => {
  return db('Menu').where(conditions).select('*');
};

Menu.getWithDetails = (conditions) => {
  return db('Menu').where(conditions).select('*').then(menus => {
    return Promise.all(menus.map(menu => {
      return createMenuContainer(menu);
    }));
  });
};


function createMenuContainer (menu) {
  return new Promise((resolve, reject) => {
    Promise.all([
      MenuCategory.getWithDetails({MenuID: menu.MenuID}),
      MenuLanguage.get({MenuID: menu.MenuID}),
      MenuTranslation.get({MenuID: menu.MenuID})
    ]).then(res => {
      console.log(res);
      let obj = menu;
      obj.categories = res[0];
      obj.languages = res[1];
      obj.translations = res[2];

      resolve(obj);
    }).catch(err => {
      reject(err);
    });
  });
}

// Get all menus
// Returns a Promise
Menu.getAll = () => {
  return db.select('*').from('Menu');
};

// Get all menus per branchID
// Returns a Promise
Menu.getAllByBranch = (id) => {
  return db('Menu').where({
    BranchID: id
  });
};


module.exports = Menu;
