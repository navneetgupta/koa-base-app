/**
 * Created by navneetgupta on 8/26/17.
 */

module.exports = {
    client: {
        lib: {
            css: [
                'public/lib/css/*.css'
            ],
            js: [
                'public/lib/js/*.js'
            ]
        },
        css: [
            'public/spa/css/*.css'
        ],
        js: [
            'public/spa/js/(!core)/*.js'
        ],
        coreJs: [
            'public/spa/js/core/*.js'
        ],
        img: [
            'public/images/*.jpg'
        ]
    },
    server: {
        //gulpConfig: ['gulpfile.js'],
        allJS: ['app.js', 'config/**/*.js', 'app/**/*.js'],
        routes: ['app/routes/*.js'],
        configs: ['lib/passport-common.js'],
        strategies: ['lib/strategies/*.js']
    }
};