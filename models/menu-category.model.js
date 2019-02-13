"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

const Meal = require('./meal.model');
const MenuCategoryTranslation = require('./menu-category-translation.model');
const CategoryStandard = require('./category-standard.model');

// Create new category in the database
// Returns a resolved Promise containing its id
let MenuCategory = class {

};

MenuCategory.create = (obj) => {
  let category = obj;
  category.Date = dateUtils.toMysqlDate(new Date());

  console.log(category);
  return db('MenuCategory').insert(category).returning('MenuCategoryID');
};


// Update new catgory in the database
// Returns a resolved Promise containing the new language
MenuCategory.update = (id, obj) => {
  let category = obj;
  category.DateUpdated = dateUtils.toMysqlDate(new Date());

  return MenuCategory.getById(id).update(category).then(res => {
    return MenuCategory.getById(id);
  });
};

// Remove category in the database
// Returns a resolved Promise containing the number of rows affected
MenuCategory.remove = (id) => {
  return db('MenuCategory').where({
    MenuCategoryID: id
  }).first('*').del();
};

// Get a category by id
// Returns a Promise
MenuCategory.getById = (id) => {
  return db('MenuCategory').where({
    MenuCategoryID: id
  }).first('*');
};


// Get a category by conditions object:
// {
//    key: value
// }
// Returns a Promise
MenuCategory.get = (conditions) => {
  return db('MenuCategory').where(conditions).select('*');
};

MenuCategory.removeSelected = (menu, cats) => {
  cats = cats || [];
  return MenuCategory.getWithDetails({MenuID: (menu.MenuID || menu.id)}).then(res => {
    var deletedCategories = res.filter(cat=> !cats.find(category=> (category.MenuCategoryID || category.id) == (cat.MenuCategoryID || cat.id)))
    return Promise.all(deletedCategories.map(menucategory => {
      let id = menucategory.MenuCategoryID || menucategory.id;
      return MenuCategory.remove(id);
    }));
  });
}


MenuCategory.getWithDetails = (conditions) => {
  return db('MenuCategory').where(conditions).select('*').then(categories => {
    return Promise.all(categories.map(category => {
      return createMenuCategoryContainer(category);
    }));
  });
};


function createMenuCategoryContainer (menu) {
  return new Promise((resolve, reject) => {
    Promise.all([
      Meal.getWithDetails({MenuCategoryID: menu.MenuCategoryID}),
      MenuCategoryTranslation.get({MenuCategoryID: menu.MenuCategoryID}),
      CategoryStandard.getById(menu.CategoryID)
    ]).then(res => {
      console.log(res);
      let obj = menu;
      obj.meals = res[0];
      obj.translations = res[1];
      obj.Category = res[2];

      resolve(obj);
    }).catch(err => {
      reject(err);
    });
  });
}

// Get all categories
// Returns a Promise
MenuCategory.getAll = () => {
  return db.select('*').from('MenuCategory');
};

// Get all categories per branchID
// Returns a Promise
MenuCategory.getAllByBranch = (id) => {
  return db('MenuCategory').where({
    MenuCategoryID: id
  });
};


module.exports = MenuCategory;
