var constants = require('./constants'),
    fullTest = require('./lib/fullTest'),
    runner = require('./runner');

runner.runFullTests().then(runner.enableKeepalive).then(runner.runFullTests);