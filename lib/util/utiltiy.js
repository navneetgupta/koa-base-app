/**
 * Created by navneetgupta on 8/26/17.
 */
'use strict';

//Error middleware Function
module.exports.errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
};

//Response Time Handler

module.exports.responseTime = async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
};

