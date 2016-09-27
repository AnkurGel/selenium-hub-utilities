var q = require("q"),
    fullTest = require('./lib/fullTest');


function runFullTests(cb) {
    var runAllTests = fullTest.selectedHubs.reduce(function(promise, nextUrl) {
        fullTest.checkArguments();
        return promise.then(() => {
            console.log("Running test with", nextUrl + ". Please wait...");
            return fullTest.newTest(nextUrl);
        });
    }, q());
    runAllTests.then(function(){
      fullTest.generateReport();
      if(cb) cb();
    });
}

exports.runFullTests = runFullTests;
