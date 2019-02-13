"use strict";

let Handlers = {
    handleError: (err) => {
        console.log(err);
        throw new Error(err);
    },

    handleException: (fn, ctx, args) => {
        try {
            return fn.apply(ctx, args);
        }
        catch (e) {
            return this.handleError(e);
        }
    }
};

module.exports = Handlers;