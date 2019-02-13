"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const cryptUtils = require('../shared/crypt-utils');
const dateUtils = require('../shared/date-utils');

const Company = require('./company.model');
const Branch = require('./branch.model');

// Create new company in the database
// Returns a resolved Promise containing its id
let Profile = class {

};



Profile.get = (obj) => {
  let company = obj;
  company.Date = dateUtils.toMysqlDate(new Date());

  return cryptUtils.generateHash(obj.Pwd).then(res => {
    company.Pwd = res;
    console.log(company);
    return db('Company').insert(company).returning('CompanyID');
  });
};

Profile.getAll = () => {
  return Company.getAll().then(companies => {
    return Promise.all(companies.map(company => {
      return createProfile(company, Branch.getWithEntities({CompanyID: company.CompanyID}));
    }));
  });
};

Profile.getByEmail = (email) => {
  return Company.getByEmail(email).then(company => {
    return createProfile(company, Branch.getWithEntities({CompanyID: company.CompanyID}));
  });
};

Profile.update = (email, obj) => {
  let profile = obj;
  profile.DateUpdated = dateUtils.toMysqlDate(new Date());

  return Company.getByEmail(email).update(profile).then(res => {
    return Company.getByEmail(email);
  });
};

function createProfile (companyObj, branchesPromise) {
  return new Promise((resolve, reject) => {
    let obj = companyObj;
    branchesPromise.then(branches => {
      obj.branches = branches;
      resolve(obj);
    })
  });
}


module.exports = Profile;
