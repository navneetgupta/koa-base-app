/**
 * Created by navneetgupta on 8/26/17.
 */
var assets = {
    client: {
        js: {
            base: {
                finalName: 'base.min',
                files: [
                    'public/js/lib/*.js',
                    'public/js/libcore/*.js'
                ]
            },
            spa: {
                finalName: 'core.min',
                files:[
                    'public/js/spa/*.js'
                ]
            }
        },
        css: {
            base : {
                finalName: 'base.min',
                files: [
                    'public/css/lib/*.css'
                ]
            },
            spa : {
                finalName: 'spa.min',
                files: [
                    'public/css/spa/*.css'
                ]
            }
        }
    }
};

module.exports = assets;