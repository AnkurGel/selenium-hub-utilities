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
    return runAllTests.then(fullTest.generateReport);
}

function enableKeepAlive() {
    console.log("\n\nUsing keep alive:\n");
    require('./keep-alive');
}

exports.runFullTests = runFullTests;
exports.enableKeepalive = enableKeepAlive;