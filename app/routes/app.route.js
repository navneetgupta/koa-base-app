/**
 * Created by navneetgupta on 8/26/17.
 */
'use strict';

const appController = require('../controllers/app.controllers'),
    preApi = require('../../lib/apiCallChain/preApi'),
    postApi = require('../../lib/apiCallChain/postApi'),
    doApi = require('../../lib/apiCallChain/doApi');

module.exports = function(router) {
    router.get('/books',appController.getBooks,appController.completeRequest);
    router.get('/',appController.getIndex,appController.completeRequest);
    router.get('/services',appController.getServicesList,preApi,doApi,postApi,appController.completeRequest);
};