var constants = require('./constants'),
    fullTest = require('./lib/fullTest'),
    runner = require('./runner');

runner.runFullTests(function(){
  console.log("Using keep alive");
  require('./keep-alive.js');

  runner.runFullTests();
});
