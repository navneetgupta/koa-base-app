/**
 * Created by navneetgupta on 8/26/17.
 */

'use strict';

const configs = {
    apiHost: process.env.API_HOST,
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
};

module.exports = configs;