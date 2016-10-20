var http = require('http'),
    https = require('https');

http.globalAgent.keepAlive = true;
http.globalAgent.keepAliveMsecs = 30*1000;

