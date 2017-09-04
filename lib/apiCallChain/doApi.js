/**
 * Created by navneetgupta on 8/26/17.
 */

'use strict';

const _ = require("underscore");

module.exports = async function(ctx,next) {

    var callRestApis = require('./asyncCallApi')();

    console.log('Inside do Api');

    var apiCalls = [], apiArgs = [], modules = ctx.module;
    var apiParamsIsArray;

    if (typeof modules.apiPath === "string") {
        modules.apiPath = [modules.apiPath];
    } else {
        if (!_.isEmpty(modules.apiParams))
            apiParamsIsArray = true;
    }
    _.each(modules.apiPath,function(apiPath, index) {
        apiCalls.push(callRestApis.getApiRespose);
        apiArgs.push({
            apiPath : apiPath,
            apiParams: getValue(modules.apiParams,index,apiParamsIsArray),
            apiMethod: getValue(modules.apiMethod,index),
            apiHeaders: getValue(modules.apiHeaders,index),
            apiContentType: getValue(modules.apiContentType,index),
            namespace: "data"+(1*index+1)
        });
    });

    await parallel(apiCalls, ctx, next, apiArgs);
};

function getValue(property, index, forceArray) {
    if (property && (property instanceof Array || forceArray))
        return property[index];
    else
        return property;
}

async function parallel(middlewares, ctx, next, args) {
    var promises = [];
    if (!args) args = [];
    try {
        middlewares.forEach((middleware, index) => {
            promises.push(middleware(ctx,args[index]));
        });
        await Promise.all(promises);
        await next();
    } catch(err) {
        //do anything useful can pass error in next middlewres also
        console.error(err);
    }
}
