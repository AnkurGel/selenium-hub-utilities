var webdriver = require('selenium-webdriver'),
    q = require('q'),
    underscore = require('underscore'),
    constants = require('../constants');

var keyCount = +process.env['KEYCOUNT'] || 100;
var selectedHubs = constants.regions[process.env['REGION'] || 'global'];

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

// TODO: handle rejection of a promise
function newTest(driverUrl) {
    var defer = q.defer();
    var driver = new webdriver.Builder().
    usingServer(driverUrl + '/wd/hub').
    withCapabilities(capabilities).
    build();

    driver.get('https://www.google.com/ncr');
    var element = driver.findElement(webdriver.By.name('q'));
    var timeNow = new Date();

    var selPromises = underscore.times(keyCount, () => { return q(element.sendKeys('a')); });
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
    underscore.sortBy(underscore.pairs(results), (hubTime) => {
        return hubTime[1];
    }).forEach((hub) => {
        console.log("--", hub[0], hub[1], "ms", "--");
    });
    console.log("--------------------------------------------------------------");
}

exports.selectedHubs = selectedHubs;
exports.checkArguments = checkArguments;
exports.newTest = newTest;
exports.generateReport = generateReport;