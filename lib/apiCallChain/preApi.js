/**
 * Created by navneetgupta on 8/26/17.
 */

module.exports = async function(ctx,next) {
    "use strict";
    console.log("Inside Pre Processor");
    ctx.module.preProcessor(ctx);
    await next();
};