/**
 * Created by navneetgupta on 8/26/17.
 */
'use strict';

module.exports.getBooks = async (ctx,next) => {
    console.log(ctx.path);
    console.log("1st middleware");
    if(!ctx.locals) ctx.locals = {};
    ctx.locals.data1 = {"book1" : [{
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
        }]};
    await next();
};

module.exports.completeRequest = async (ctx,next) => {
    if(ctx.locals.data1) {
        ctx.body = ctx.locals.data1;
    }
};