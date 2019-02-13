const constants = require('./constants');

var pg = require('pg');
pg.types.setTypeParser(20, 'text', parseInt);
var knex = require('knex')({
    client: constants.DB_TYPE,
    debug: true,
    connection: "postgres://oneoxkncqtrras:9212da356793ed5b2899f3114d39dfa8a0649d43e75f7881b58804b608f0f469@ec2-54-247-80-8.eu-west-1.compute.amazonaws.com:5432/ddl2p77rpgbrn3?ssl=true",
    acquireConnectionTimeout: 10000,
    ssl: true,
    //pool: { min: 0, max: 7 }
});

let DBConnecter = class {
    constructor(host, port, db, user, pwd, has_ssl) {
        this.connection = knex;
    }
};

module.exports = DBConnecter;