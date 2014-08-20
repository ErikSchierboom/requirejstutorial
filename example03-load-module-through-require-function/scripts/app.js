// This JavaScript file defines a module without any explicit dependencies on other modules. 
// It does however indicate that it expects a parameter to be supplied to its callback
// method. This will be recognized by RequireJS and it will automatically pass the
// 'require()' function, which can then be used to load modules with. The callback method itself
// is called when another module requires this module.
define(function (require) {
    // Here we load the module named 'messages' using the 'require' parameter, which is
    // actually a function with which modules can be loaded. When requiring the 'messages'
    // module, RequireJS will request it from: "scripts/messages.js"
    var messages = require('messages');

	// We use the object returned by the 'messages' module and call its 'getHello'() function
    alert(messages.getHello());
});