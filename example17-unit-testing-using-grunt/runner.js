// Require the test modules
require(['tests/mathtests'], function(mathTest) {
    // Now that we have asynchronously loaded the tests
    // we can give QUnit the signal to start running the tests
    QUnit.load();
    QUnit.start();
});