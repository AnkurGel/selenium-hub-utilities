var webdriver = require('selenium-webdriver');
var q = require('q');
var underscore = require('underscore');
var constants = require('./constants');

var keyCount = +process.env['KEYCOUNT'] || 100;

function checkArguments() {
  if(!process.env['BROWSERSTACK_USERNAME'] || !process.env['BROWSERSTACK_ACCESS_KEY']){
    console.log("Correct usage: BROWSERSTACK_USERNAME=your_user_name BROWSERSTACK_ACCESS_KEY=your_access_key node index.js ");
    process.exit();
  }
}

var results = {};

var capabilities = {
  'browserName' : 'chrome', 
  'os': 'OS X',
  'os_version': 'Yosemite',
  'browserstack.user': process.env['BROWSERSTACK_USERNAME'],
  'browserstack.key': process.env['BROWSERSTACK_ACCESS_KEY']
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

  var selPromises = underscore.times(keyCount, () => { return element.sendKeys('a'); });
  q.allSettled(selPromises).then(function() {
    var timeTaken = new Date() - timeNow;
    console.log("Time taken by", driverUrl, "-", timeTaken, 'ms');
    results[driverUrl] = timeTaken;
    driver.quit();
    defer.resolve();
  });
  return defer.promise;
}

function generateReport() {
  console.log("--------------------------------------------------------------");
  console.log("----------------------------REPORT----------------------------");
  underscore.sortBy(underscore.pairs(results), (k, v) => {
    return v;
  }).forEach((hub) => {
    console.log("--", hub[0], hub[1], "ms", "--");
  });
  console.log("--------------------------------------------------------------");
}

var runAllTests = constants.conf.global.reduce(function(promise, nextUrl) {
  return promise.then(() => {
    console.log("Running test with", nextUrl + ". Please wait...");
    return newTest(nextUrl);
  });
}, q());
runAllTests.then(generateReport);