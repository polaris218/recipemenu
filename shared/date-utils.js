"use strict";

let DateUtils = {
	/**
	 * Formatting function to pad numbers to two digits
	 **/
	padDigits: function (d) {
	    if(0 <= d && d < 10) return "0" + d.toString();
	    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
	    return d.toString();
	},

	/**
	 * Output the date string to match SQL "Datetime" format
	 **/
	toMysqlDate: function (date) {
	    return date.getUTCFullYear() + "-"
	    	+ this.padDigits(1 + date.getUTCMonth()) + "-"
	    	+ this.padDigits(date.getUTCDate()) + " "
	    	+ this.padDigits(date.getUTCHours()) + ":"
	    	+ this.padDigits(date.getUTCMinutes()) + ":"
	    	+ this.padDigits(date.getUTCSeconds());
	}
};

module.exports = DateUtils;