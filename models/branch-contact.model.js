"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

// Create new contact language in the database
// Returns a resolved Promise containing its id
let BranchContact = class {

};

BranchContact.create = (obj) => {
  let contact = obj;
  contact.Date = dateUtils.toMysqlDate(new Date());

  console.log(contact);
  return db('BranchContact').insert(contact).returning('BranchContactID');
};

BranchContact.createAll = (contacts) => {
  if (!contacts || contacts.length <= 0) {
    console.error('No contacts specified');
    return Promise.resolve([]);
  }

  return Promise.all(contacts.map(contact => {
    console.log(contact);
    return BranchContact.create({
      BranchID: contact.BranchID,
      Firstname: contact.Firstname,
      Lastname: contact.Lastname,
      ImagePath: contact.ImagePath,
      ImageAltDesc: contact.ImageAltDesc,
      Email: contact.Email,
      Tel: contact.Tel,
      IsAdmin: contact.IsAdmin
    });
  }));
};


BranchContact.updateAll = (contacts) => {
  if (!contacts || contacts.length <= 0) {
    console.error('No contacts specified');
    return Promise.resolve([]);
  }

  return Promise.all(contacts.map(contact => {
    return BranchContact.getById(contact.BranchContactID).then(res => {
      if (!res || res.length <= 0) {
        return BranchContact.create({
          BranchID: contact.BranchID,
          Firstname: contact.Firstname,
          Lastname: contact.Lastname,
          ImagePath: contact.ImagePath,
          ImageAltDesc: contact.ImageAltDesc,
          Email: contact.Email,
          Tel: contact.Tel,
          IsAdmin: contact.IsAdmin
        });
      }

      return BranchContact.update(contact.BranchContactID, {
        BranchID: contact.BranchID,
        Email: contact.Email,
        Firstname: contact.Firstname,
        Lastname: contact.Lastname,
        ImagePath: contact.ImagePath,
        ImageAltDesc: contact.ImageAltDesc,
        IsAdmin: contact.IsAdmin,
        Tel: contact.Tel
      });
    })
  }));
};

// Update contact in the database
// Returns a resolved Promise containing the new cuisine
BranchContact.update = (id, obj) => {
  let contact = obj;
  contact.DateUpdated = dateUtils.toMysqlDate(new Date());

  return BranchContact.getById(id).update(contact).then(res => {
    return BranchContact.getById(id);
  });
};

// Remove contact in the database
// Returns a resolved Promise containing the number of rows affected
BranchContact.remove = (id) => {
  return db('BranchContact').where({
    BranchContactID: id
  }).first('*').del();
};

// Get a contact by id
// Returns a Promise
BranchContact.getById = (id) => {
  return db('BranchContact').where({
    BranchContactID: id
  }).first('*');
};


// Get a contact by conditions object:
// {
//    key: value
// }
// Returns a Promise
BranchContact.get = (conditions) => {
  return db('BranchContact').where(conditions).select('*');
};

// Get all contacts
// Returns a Promise
BranchContact.getAll = () => {
  return db.select('*').from('BranchContact');
};


module.exports = BranchContact;
