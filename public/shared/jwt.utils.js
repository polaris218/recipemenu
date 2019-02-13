const jwt = require('jsonwebtoken');

export let Jwt = {

    //
    /** Map props strings we use in the front-end to the DB's */
    //
    decode: function (token, secret) {
        try {
            return jwt.verify(token, secret);
        } catch (err) {
            console.error(err);
            return;
        }
    }
};