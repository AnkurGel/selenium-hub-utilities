var webdriver = require('selenium-webdriver'),
    q = require('q'),
    underscore = require('underscore'),
    constants = require('../constants');

var keyCount = +process.env['KEYCOUNT'] || 100;
var selectedHubs = constants.regions[process.env['REGION'] || 'global'];

function checkArguments() {
    if(!process.env['BROWSERSTACK_USERNAME'] || !process.env['BROWSERSTACK_ACCESS_KEY']){
        if(process.platform && process.platform == 'win32') {
            console.log("Correct usage: set BROWSERSTACK_USERNAME=your_user_name && set BROWSERSTACK_ACCESS_KEY=your_access_key &&", process.argv[0]);
        } else {
            var command = process.argv[0] == 'node' ? process.argv.join(' ') : process.argv[0];
            console.log("Correct usage: BROWSERSTACK_USERNAME=your_user_name BROWSERSTACK_ACCESS_KEY=your_access_key", command);
        }
        process.exit();
    }
}

var results = {};

var capabilities = {
    'browserName' : 'chrome',
    'os': 'OS X',
    'os_version': 'Yosemite',
    'browserstack.user': process.env['BROWSERSTACK_USERNAME'],
    'browserstack.key': process.env['BROWSERSTACK_ACCESS_KEY'],
    'build': 'Selenium Utilities - Speed test ' + (process.env['REGION'] || '')
};

var flow = webdriver.promise.controlFlow();

function newTest(driverUrl) {
    capabilities['name'] = driverUrl;
    var defer = q.defer();
    flow.execute(function() {
        var driver = new webdriver.Builder().
        usingServer(driverUrl + '/wd/hub').
        withCapabilities(capabilities).
        build();

        driver.get('https://www.google.com/ncr');
        var element = driver.findElement(webdriver.By.name('q'));
        var timeNow = new Date();
        element.then(function() {
            timeNow = new Date();
        });


        var selPromises = underscore.times(keyCount, () => { return q(element.sendKeys('a')); });
        q.allSettled(selPromises).then(function() {
            var timeTaken = new Date() - timeNow;
            console.log("Time taken by", driverUrl, "-", timeTaken, 'ms');
            results[driverUrl] = timeTaken;
            driver.quit().then(defer.resolve, defer.resolve);
        });
    }).catch(function(e) {
        console.log("--> Couldn't complete this - ", e.message);
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
