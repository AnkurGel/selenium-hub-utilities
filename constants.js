var fs = require('fs'),
    path = require('path'),
    yaml = require('js-yaml');

exports.regions = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), './config.yml'))).regions;
