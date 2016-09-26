var fs = require('fs'),
    path = require('path'),
    yaml = require('js-yaml');

exports.regions = { global:
   [ 'http://hub.browserstack.com',
     'https://hub.browserstack.com',
     'http://hub.browserstack.com:4444',
     'http://hub-cloud.browserstack.com',
     'https://hub-cloud.browserstack.com' ],
  us_east:
   [ 'http://hub-us.browserstack.com',
     'https://hub-us.browserstack.com',
     'http://hub-us.browserstack.com:4444',
     'http://hub-cloud-us.browserstack.com',
     'https://hub-cloud-us.browserstack.com' ],
  us_west:
   [ 'http://hub-usw.browserstack.com',
     'https://hub-usw.browserstack.com',
     'http://hub-usw.browserstack.com:4444',
     'http://hub-cloud-usw.browserstack.com',
     'https://hub-cloud-usw.browserstack.com' ],
  eu_west:
   [ 'http://hub-eu.browserstack.com',
     'https://hub-eu.browserstack.com',
     'http://hub-eu.browserstack.com:4444',
     'http://hub-cloud-eu.browserstack.com',
     'https://hub-cloud-eu.browserstack.com' ] 
}
