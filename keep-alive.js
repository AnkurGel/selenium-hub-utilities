var http = require('http'),
    https = require('https');

var agent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 30*1000
});

var secureAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 30*1000
});

var httpRequest = http.request;
var httpsRequest = http.request;

http.request = function(options, callback){
  if(options.protocol == "https:"){
    options["agent"] = secureAgent;
    return httpsRequest(options, callback);  
  }
  else {
    options["agent"] = agent;
    return httpRequest(options, callback);
  }
}
