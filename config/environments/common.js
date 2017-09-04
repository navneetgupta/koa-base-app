/**
 * Created by navneetgupta on 8/26/17.
 */

const settings = {
    host: process.env.HOST,
    port: process.env.NODE_PORT || 3010,
    apiHost:process.env.API_HOST,
    secretKey:process.env.SECRET_KEY
};

module.exports = settings;