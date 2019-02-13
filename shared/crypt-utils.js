"use strict";

// Load the bcrypt module
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const SALT_ROUNDS = 10;

let CryptUtils = {
    /**
	 * Generates random string of characters i.e salt
	 * @function
	 * @param {number} length - Length of the random string.
	 */
	generateRandomString: function (length) {
		return crypto.randomBytes(Math.ceil(length / 2))
			.toString('hex')
	        .slice(0, length);
	},

	/**
	 * Generates a password hash using bcrypt.
	 * @function
	 * @param {string} pwd - plain text password.
	 * @returns Promise containing the hash
	 */
	generateHash: function (pwd) {
		return bcrypt.hash(pwd, SALT_ROUNDS);
	},

	/**
	 * Compare a given password with the hashed password.
	 * @function
	 * @param {string} pwd - plain text password.
	 * @param {string} hash - hashed stored password.
	 * @returns Promise containing a boolean
	 */
	checkPwd: function (pwd, hash) {
		return bcrypt.compare(pwd, hash);
	}
};

module.exports = CryptUtils;