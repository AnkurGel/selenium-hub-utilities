var webdriver = require('selenium-webdriver');
var q = require('q');
var underscore = require('underscore');

var keyCount = +process.env['KEYCOUNT'] || 100;

function checkArguments() {
  if(!process.env['BROWSERSTACK_USERNAME'] || !process.env['BROWSERSTACK_ACCESS_KEY']){
    console.log("Correct usage: BROWSERSTACK_USERNAME=your_user_name BROWSERSTACK_ACCESS_KEY=your_access_key node index.js ");
    process.exit();
  }
}

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
  'browserstack.user': process.env['BROWSERSTACK_USERNAME'],
  'browserstack.key': process.env['BROWSERSTACK_ACCESS_KEY'],
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

checkArguments();
defaultEndpoints.reduce(function(promise, nextUrl) {
  return promise.then(function() {
    console.log("Running test with", nextUrl + ". Please wait...");
    return newTest(nextUrl);
  });
}, q());
