/**
 * Created by navneetgupta on 8/26/17.
 */

'use strict';

require('dotenv').load();

const Koa = require('koa'),
    config = require('../config/config'),
    utilities = require('./util/utiltiy'),
    path = require('path'),
    router = require('koa-router')(),
    koaBody = require('koa-body');

const app = new Koa();

app.use(utilities.errorHandler);
app.use(utilities.responseTime);
app.use(utilities.logger);

app.use(koaBody({
    json:true,
    urlencoded:true
}));

config.files.server.routes.forEach(function (routePath) {
    console.log("routePAth === " +routePath);
    require(path.resolve(routePath))(router);
});

app.use(router.routes());

module.exports.start = function() {
    app.listen(process.env.NODE_PORT,() => {
        console.log("Server Started on Port 3010");
    });
};