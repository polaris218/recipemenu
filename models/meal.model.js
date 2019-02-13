"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

const MealTranslation = require('./meal-translation.model');
const MealImage = require('./meal-image.model')
    // Create new meal in the database
    // Returns a resolved Promise containing its id
let Meal = class {

};

Meal.create = (obj) => {
    let meal = obj;
    meal.Date = dateUtils.toMysqlDate(new Date());
    console.log(meal);
    return db('Meal').insert(meal).returning('MealID');
};

Meal.createWithDetails = (obj) => {
    let insertNewId = (id, arr) => {
        if (!id) {
            return arr;
        }

        let newObject = arr.map(item => {
            if (!item.MealID) {
                let newItem = item;
                newItem.MealID = id;
                return newItem;
            }

            return item;
        });

        console.log('insertNewId');
        console.log(newObject);

        return newObject;
    };

    let meal = obj;

    return Meal.create({
        MenuCategoryID: meal.MenuCategoryID,
        MealDetailID: meal.MealDetailID,
        Title: meal.Title,
        Description: meal.Description,
        Price: meal.Price,
        EnableDetails: meal.EnableDetails,
        Date: dateUtils.toMysqlDate(new Date())
    }).then(res => {
        console.log(res);
        let id = res[0];

        return Promise.all([
            MealImage.createAll(insertNewId(id, meal.images))
        ]).then(res => {
            console.log(res);

            let tmp = branch;
            tmp.images = res[0][0];

            console.log('finalobj created');
            console.log(tmp);

            //return Promise.resolve(tmp);
            return Meal.getById(id);
        });
    }).catch(err => {
        return Promise.reject(err);
    });
};

// Update new meal in the database
// Returns a resolved Promise containing the new language
Meal.update = (id, obj) => {
    let meal = obj;
    meal.DateUpdated = dateUtils.toMysqlDate(new Date());

    return Meal.getById(id).update(meal).then(res => {
        return Meal.getById(id);
    });
};

// Remove meal in the database
// Returns a resolved Promise containing the number of rows affected
Meal.remove = (id) => {
    return db('Meal').where({
        MealID: id
    }).first('*').del();
};

// Get a meal by id
// Returns a Promise
Meal.getById = (id) => {
    return db('Meal').where({
        MealID: id
    }).first('*');
};


// Get a menu by conditions object:
// {
//    key: value
// }
// Returns a Promise
Meal.get = (conditions) => {
    return db('Meal').where(conditions).select('*');
};

Meal.getWithDetails = (conditions) => {
    return db('Meal').where(conditions).select('*').then(meals => {
        return Promise.all(meals.map(meal => {
            return createMealCategoryContainer(meal);
        }));
    });
};

Meal.removeSelected = (category, meals) => {
    meals = meals || [];
    return Meal.getWithDetails({ MenuCategoryID: category.MenuCategoryID }).then(res => {
        var deletedMeals = res.filter(ml => !meals.find(meal => (meal.MealID || meal.id) == (ml.MealID || ml.id)))
        return Promise.all(deletedMeals.map(catMeal => {
            let id = catMeal.MealID || catMeal.id;
            return Meal.remove(id);
        }));
    });
}

function createMealCategoryContainer(meal) {
    return new Promise((resolve, reject) => {
        Promise.all([
            MealTranslation.get({ MealID: meal.MealID })
        ]).then(res => {
            console.log(res);
            let obj = meal;
            obj.translations = res[0];

            resolve(obj);
        }).catch(err => {
            reject(err);
        });
    });
}

// Get all meals
// Returns a Promise
Meal.getAll = () => {
    return db.select('*').from('Meal');
};

// Get all meals per MenuCategory
// Returns a Promise
Meal.getAllByBranch = (id) => {
    return db('Meal').where({
        MenuCategoryID: id
    });
};


module.exports = Meal;