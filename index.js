var webdriver = require('selenium-webdriver');
var q = require('q');
var underscore = require('underscore');

var keyCount = 5;
var defaultEndpoints = [
  "http://hub.browserstack.com",
  "https://hub.browserstack.com",
  "http://hub.browserstack.com:4444",
  "http://hub-cloud.browserstack.com",
  "https://hub-cloud.browserstack.com"
];

var capabilities = {
  'browserName' : 'chrome', 
  'os': 'OS X',
  'os_version': 'Yosemite',
  'browserstack.user': 'ankurgoel2',
  'browserstack.key': '9AsCNV1GyRT9wmauzzys'
};

function newTest(driverUrl) {
  var defer = q.defer();
  var driver = new webdriver.Builder().
  usingServer(driverUrl + '/wd/hub').
  withCapabilities(capabilities).
  build();

  driver.get('https://www.google.com/ncr');
  var element = driver.findElement(webdriver.By.name('q'));
  var timeNow = new Date();

  var selPromises = underscore.times(keyCount, function(){ return element.sendKeys('a'); });
  q.allSettled(selPromises).then(function() {
    console.log("Time taken by", driverUrl, "-", (new Date() - timeNow), 'ms');
    driver.quit();
    defer.resolve();
  });
  return defer.promise;
}

defaultEndpoints.reduce(function(promise, nextUrl) {
  return promise.then(function() {
    return newTest(nextUrl);
  });
}, q());