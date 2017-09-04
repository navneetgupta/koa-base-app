/**
 * Created by navneetgupta on 8/26/17.
 */
'use strict';

const apiSettings = require('../../lib/apiCallChain/apiConfigs'),
    path = require('path'),
    config = require(path.resolve('config/config'));

module.exports.getBooks = async (ctx,next) => {
    if(!ctx.state) ctx.state = {};
    ctx.state.data1 = {
        "book1" : [{
            'author': 'Navneet Gupta',
            'title' : 'Advance ES6'
            },
            {
                'author': 'Navneet Gupta1',
                'title' : 'Advance ES7'
            },
            {
                'author': 'Navneet Gupta2',
                'title' : 'Advance ES8'
            }
        ]
    };
    await next();
};
module.exports.getIndex = async (ctx,next) => {
    if(!ctx.state) ctx.state = {};
    ctx.state.data1 = "Hi There!!!";
    await next();
};

module.exports.completeRequest = async (ctx) => {
    if(ctx.state.data1) {
        console.log("response goit ");
        ctx.body = ctx.state.data1;
    }
};

module.exports.getServicesList = async (ctx,next) => {
    ctx.module = createReqModule(process.env.SERVICE_PATH,process.env.AUTH_TOKEN_DEFAULT);
    await next();
};


function createReqModule(apiPath,authToken) {
    const module = {
        apiMethod: 'get',
        apiParams: {},
        apiPath: apiPath,
        apiHeaders:authToken,
        preProcessor: function(req,res) {console.log('Inside pre processor');},
        postProcessor: function(req,res) {console.log('Inside post processor');}
    };
    return apiSettings.initModules(module);
}