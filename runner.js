var q = require("q"),
    fullTest = require('./lib/fullTest');


function runFullTests() {
    var runAllTests = fullTest.selectedHubs.reduce(function(promise, nextUrl) {
        fullTest.checkArguments();
        return promise.then(() => {
            console.log("Running test with", nextUrl + ". Please wait...");
            return fullTest.newTest(nextUrl);
        });
    }, q());
    runAllTests.then(fullTest.generateReport);
}

exports.runFullTests = runFullTests;
