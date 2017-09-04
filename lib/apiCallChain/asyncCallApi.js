/**
 * Created by navneetgupta on 9/4/17.
 */
'use strict';

const path = require('path'),
    config = require(path.resolve('config/config')),
    sa = require('superagent'),
    _ = require('underscore'),
    fs = require('fs');

module.exports = function(){
    console.log('inside callAPi file');
    return {
        getApiRespose : getApiResponse,
        callApi : callApi
    };

    async function getApiResponse(ctx,apiArgs) {
        if(!apiArgs.apiPath) {
            console.log('Not able to make calls since no apiPath found');
        } else {
            console.log('Going to callApi');
            try {
                let res = await callApi(ctx,apiArgs);
                if(res) {
                    console.log("Got Response from api call,Setting in the ctx.state");
                    ctx.state[apiArgs.namespace] = res.body;
                    ctx.state[apiArgs.namespace].statusCode = res.statusCode;
                    //if(response.files)
                    //    ctx.state[apiArgs.namespace].file = res.files['fileKey'];
                }
            } catch(err) {
                //do anything useful can pass error in next middlewres also
                console.error(err);
            }
        }
    }

    function callApi(ctx,apiArgs) {
        console.log("call Api Method === " + JSON.stringify(apiArgs));
        const hosturl = config.apiHost;
        apiArgs.saMethod = (apiArgs.apiMethod === 'get' || apiArgs.apiMethod === 'delete')? 'query' : 'send';
        apiArgs.apiHeaders = (apiArgs.apiHeaders) ? apiArgs.apiHeaders : '';
        apiArgs.apiPath = hosturl+apiArgs.apiPath;
        console.log("apiArgs.apiPath == " + apiArgs.apiPath);
        ctx.apiCookieHeader = ctx.apiCookieHeader ? ctx.apiCookieHeader : "Custom";
        return sa
            [apiArgs.apiMethod](apiArgs.apiPath)
            [apiArgs.saMethod](apiArgs.apiParams)
            .type(apiArgs.apiContentType)
            .set('Cookie',ctx.apiCookieHeader)
            .set('X-AUTH-TOKEN',apiArgs.apiHeaders)
            .set('X-AUTH-TOKEN2',process.env.SECRET_KEY)
            .timeout(config.timeout);
    }
};
