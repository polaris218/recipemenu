"use strict";

const constants = require('../constants');

const geocoder = require('node-geocoder')({
	provider: 'google',
	apiKey: constants.GOOGLE_MAPS_API_KEY
});

let GeoUtils = {
	/**
 	* Returns the full geo data associated to an address using a geocoder
	* @function
	* @param {string} address - plain text address.
	* @returns Promise containing the full geo data
	*/
	geocodeAddress: function (address) {
		return geocoder.geocode(address);
	},

	/**
 	* Converts an address to {lat, long} using a geocoder
	* @function
	* @param {string} address - plain text address.
	* @returns Promise containing {lat, long}
	*/
	convertToLatLong: function (address) {
	    return this.geocodeAddress(address).then(function (geodata) {
	    	if (!geodata || geodata.length <= 0) {
	    		return Promise.reject(geodata);
	    	}

	    	return geodata.map(function (res) {
		    	return { latitude: res.latitude, longitude: res.longitude };
		    })[0];
	    }).catch(function (err) {
	    	console.error(err);
	    	return { latitude: null, longitude: null };
	    });
	}
};

module.exports = GeoUtils;