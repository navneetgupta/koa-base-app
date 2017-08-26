/**
 * Created by navneetgupta on 8/26/17.
 */
'use strict';

const appController = require('../controllers/app.controllers');

module.exports = function(router) {
    router.get('/books',appController.getBooks,appController.completeRequest);
    router.get('/',appController.getIndex,appController.completeRequest)
};