var fs = require('fs'),
    yaml = require('js-yaml');

exports.conf = yaml.safeLoad(fs.readFileSync('./config.yml'));
