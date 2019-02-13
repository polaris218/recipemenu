"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');


///////////////////
// TODO: Subscription
// Add a subscription should only be accessible from OM admins
///////////////////

// Create new subscription in the database
// Returns a resolved Promise containing its id
let Subscription = class {

};

Subscription.create = (obj) => {
  let sub = obj;
  sub.Date = dateUtils.toMysqlDate(new Date());

  console.log(sub);
  return db('Subscription').insert(sub).returning('SubscriptionID');
};


// Update new subscription in the database
// Returns a resolved Promise containing the new language
Subscription.update = (id, obj) => {
  let sub = obj;
  sub.DateUpdated = dateUtils.toMysqlDate(new Date());

  return Subscription.getById(id).update(sub).then(res => {
    return Subscription.getById(id);
  });
};

// Remove subscription in the database
// Returns a resolved Promise containing the number of rows affected
Subscription.remove = (id) => {
  return db('Subscription').where({
    SubscriptionID: id
  }).first('*').del();
};

// Get a subscription by id
// Returns a Promise
Subscription.getById = (id) => {
  return db('Subscription').where({
    SubscriptionID: id
  }).first('*');
};


// Get a subscription by conditions object:
// {
//    key: value
// }
// Returns a Promise
Subscription.get = (conditions) => {
  return db('Subscription').where(conditions).select('*');
};

// Get all subscriptions
// Returns a Promise
Subscription.getAll = () => {
  return db.select('*').from('Subscription');
};

// Get all subscriptions per MenuCategory
// Returns a Promise
Subscription.getAllByBranch = (id) => {
  return db('Subscription').where({
    SubscriptionID: id
  });
};


module.exports = Subscription;
