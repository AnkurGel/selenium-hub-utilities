var fs = require('fs'),
    yaml = require('js-yaml');

exports.regions = yaml.safeLoad(fs.readFileSync('./config.yml')).regions;
