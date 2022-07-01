const path = require('path');

const projectRoot = path.resolve(__dirname, '../../../');

const cssPaths = {
    build: 'wwwroot/css',
    main: ['./www/sources/css/main.scss'],
    home: ['./www/sources/css/pages/home/index.scss'],
};

const scriptPaths = {
    build: 'wwwroot/js',
    home: ['./www/sources/js/pages/home/index.js'],
};

module.exports = {
    projectRoot: projectRoot,
    cssPaths: cssPaths,
    scriptPaths: scriptPaths
};