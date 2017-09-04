/**
 * Created by navneetgupta on 8/26/17.
 */
'use strict';

const _ = require('underscore'),
    path = require('path');

var defaultApiConfig = {
    apiMethod: 'get',
    apiParams: {},
    apiHost: '',
    apiPort: '',
    apiPath: '',
    postApiQuery: '',
    apiRoute:null,
    apiContentType:'json',
    stubName:null,
    useStub:'',
    apiHeaders:{},
    preProcessor: function(ctx){ },
    postProcessor: function(ctx) { }
};

function cloneModule(source) {
    var newModule = _.clone(source);
    newModule.apiPath = _.clone(source.apiPath);
    newModule.apiParams = _.clone(source.apiParams);
    return newModule;
}

module.exports.initModules = function(apiConfigs) {
    var seedModule = _.extend(cloneModule(defaultApiConfig), apiConfigs);
    return seedModule;
};
module.exports.cloneModules = cloneModule;