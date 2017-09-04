/**
 * Created by navneetgupta on 8/26/17.
 */

const settings = {
    host: '127.0.0.1',
    port: process.env.NODE_PORT ||3010,
    apiHost:process.env.API_HOST ||  'http://localhost:8080',
    secretKey:process.env.SECRET_KEY
};

module.exports = settings;