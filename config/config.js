/**
 * Created by navneetgupta on 8/26/17.
 */
'use strict';

const _ = require('lodash'),
    glob = require('glob'),
    path = require('path');

const getGlobbedPaths = function (globPatterns, excludes) {
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    var output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            var files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function (file) {
                    if (_.isArray(excludes)) {
                        for (var i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], '');
                            }
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};

/**
 * Initializing global configuration files
 */
var initGlobalConfigFiles = function (config, components) {
    config.files = {
        server: {},
        client: {}
    };

    config.files.server.routes = getGlobbedPaths(components.server.routes);

    config.files.server.configs = getGlobbedPaths(components.server.config);

    config.files.client.js = getGlobbedPaths(components.client.lib.js, 'public/').concat(getGlobbedPaths(components.client.js, ['public/']));

    config.files.client.css = getGlobbedPaths(components.client.lib.css, 'public/').concat(getGlobbedPaths(components.client.css, ['public/']));
};

var getGlobalConfigs = function() {
    const commonComponents = require(path.join(process.cwd(), 'config/assets/development'));

    const envComponents = {};

    const components = _.merge(commonComponents, envComponents);

    const defaultSettings = require(path.join(process.cwd(), 'config/environments/common'));

    const envSettings = {};//require(path.join(process.cwd(), 'config/environments/', process.env.NODE_ENV)) || {};

    var config = _.merge(defaultSettings, envSettings);

    initGlobalConfigFiles(config, components);

    config.utils = {
        getGlobbedPaths:getGlobbedPaths
    };

    return config;
};

module.exports = getGlobalConfigs();