/**
 * Created by navneetgupta on 8/26/17.
 */

'use strict';

const configs = {
    apiHost: process.env.API_HOST ||  'http://localhost:8080',
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
};

module.exports = configs;