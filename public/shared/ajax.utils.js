"use strict";

import 'whatwg-fetch';

const BASE_URL = 'http://localhost:8080/api';

export let Ajax = (url) => {
    let baseUrl = url || window.location.origin + '/api';
    // let baseUrl = 'https://one-menu-b2b.herokuapp.com/api';
    //
    /** Generic method for AJAX calls */
    //
    function query (obj) {
        console.log(obj, 'query');
        return fetch(obj.path, obj.opts)
            .then(checkStatus)
            .then(parseJSON);
    };

    //
    /** Create full object for the query */
    //
    function createQuery (endpoint, opts, method) {
        let options = opts;
        options.method = method;

        return {
            path: baseUrl + endpoint,
            opts: options
        };
    };

    //
    /** Handle errors */
    //
    function checkStatus (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };

    function parseJSON (response) {
        console.log(response, 'ttt' )
        return  response.json();
    };

    return {

        //
        /** Generic Abstracted GET method calling query */
        //
        get: function (endpoint, opts) {
            return query(createQuery(endpoint, opts, 'GET'));
        },
        //
        /** Generic Abstracted POST method calling query */
        //
        post: function (endpoint, opts) {
            return query(createQuery(endpoint, opts, 'POST'));
        },
        //
        /** Generic Abstracted PUT method calling query */
        //
        put: function (endpoint, opts) {
            return query(createQuery(endpoint, opts, 'PUT'));
        },
        //
        /** Generic Abstracted DELETE method calling query */
        //
        delete: function (endpoint, opts) {
            return query(createQuery(endpoint, opts, 'DELETE'));
        }
    }
};