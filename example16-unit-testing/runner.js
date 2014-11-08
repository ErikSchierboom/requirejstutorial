require.config({
    paths: {
        'QUnit': 'lib/qunit-1.15.0'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               // When the QUnit module is loaded, we have to 
               // configure it to not automatically start running
               // the tests as they'll be loaded later on
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       } 
    }
});

// require the QUnit library and all test module
require(['QUnit', 'tests/mathtests'], function(QUnit, mathTests) {
    // Now that we have asynchronously loaded the tests
    // we can give QUnit the signal to start running the tests
    QUnit.load();
    QUnit.start();
});