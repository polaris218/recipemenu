"use strict";

const DBLayer = require('../DBLayer');
const db = DBLayer.connection;
const dateUtils = require('../shared/date-utils');

const Company = require('./company.model');

const ANALYTICS_TOTAL = 'ANALYTICS_TOTAL';
const ANALYTICS_MOST_VIEWED = 'ANALYTICS_MOST_VIEWED';

const analyticsToReturn = [
  {
    type: ANALYTICS_TOTAL,
    entity: 'Branch',
  },
  {
    type: ANALYTICS_TOTAL,
    entity: 'Menu',
  },
  {
    type: ANALYTICS_TOTAL,
    entity: 'Meal',
  },
  {
    type: ANALYTICS_MOST_VIEWED,
    entity: 'Branch',
  },
  {
    type: ANALYTICS_MOST_VIEWED,
    entity: 'Menu',
  },
  {
    type: ANALYTICS_MOST_VIEWED,
    entity: 'Meal',
  },
];

// Create new analytic entry in the database
// Returns a resolved Promise containing its id
let Analytics = class {

};

Analytics.create = (obj) => {
  let companyId;
  // 
  let analytic = {
    CompanyID: obj.companyId,
    Event: obj.event,
    EventType: obj.type,
    Title: obj.title,
    EventIDType: obj.id,
    EventID: obj.id,
    Date: dateUtils.toMysqlDate(new Date()),
  };

  return db('Analytics').insert(analytic).returning('AnalyticsID');
};

// Get a Analytic by id
// Returns a Promise
Analytics.getById = (id) => {
  return db('Analytics').where({
    AnalyticsID: id
  }).first('*');
};


// Get an Analytic by conditions object:
// {
//    key: value
// }
// Returns a Promise
Analytics.get = (conditions) => {
  return db('Analytics').where(conditions).select('*');
};

Analytics.getTotal = (companyId, analytic, type) => {
  return db('Analytics').where({
    CompanyID: companyId,
    EventType: analytic.entity,
  }).count('*').then(res => {
    const element = res[0];
    const count = element[Object.keys(element)[0]];
    return {
      count,
      entityType: analytic.entity,
      analyticType: type,
    };
  });
};

Analytics.getMostViewed = (companyId, analytic, type) => {
  const entity = analytic.entity.toString();
  const Entity = require(`./${entity.toLowerCase()}.model`);
  let mostViewed;

  const getMostViewedEntity = (arr) => {
    return arr.reduce((acc, current, index) => {
      acc.analyticMap[current.EventID] = !acc.analyticMap[current.EventID]
        ? 1
        : ++acc.analyticMap[current.EventID];

      if (acc.analyticMap[current.EventID] > acc.counter) {
        acc.maxEventId = current.EventID;
        acc.counter = acc.analyticMap[current.EventID];
      }

      return acc;
    }, {
      counter: 1,
      analyticMap: {},
      maxEventId: arr[0].EventID,
    });
  };

  return Analytics.get({
    CompanyID: companyId,
    EventType: analytic.entity,
  }).then(analytics => {
    if (!analytics || analytics.length <= 0) {
      return Promise.resolve({
        entityType: analytic.entity,
        analyticType: type,
        entity: null,
      });
    }

    mostViewed = getMostViewedEntity(analytics || []);

    return Entity.get({
      [`${entity}ID`]: mostViewed.maxEventId,
    });
  }).then(entity => {
    return {
      entity: {
        ...entity[0]
      },
      entityType: analytic.entity,
      analyticType: type,
      count: mostViewed.analyticMap[mostViewed.maxEventId],
    };
  });
};

Analytics.getAnalytic = (companyId, analytic) => {
  const { type } = analytic;

  const renderAnalytic = (analyticType) => {
    switch(analyticType) {
      case ANALYTICS_MOST_VIEWED:
        return Analytics.getMostViewed(companyId, analytic, analyticType);
      case ANALYTICS_TOTAL:
      default:
        return Analytics.getTotal(companyId, analytic, analyticType);
    }
  }
  
  return renderAnalytic(type);
}

// Get all analytics
// Returns a Promise
Analytics.getAll = (email) => {
  return Company.getByEmail(email).then(company => {
    return Promise.all(analyticsToReturn.map(analytic => {
      return Analytics.getAnalytic(company.CompanyID, analytic);
    }));
  });
};

module.exports = Analytics;
