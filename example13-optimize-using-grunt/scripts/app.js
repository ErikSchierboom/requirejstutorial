// This JavaScript file defines a module with two explicit dependencies: the 'messages' and
// 'gui' modules. Explicit dependencies are specified in the first parameter as an array of strings. 
// The second parameter is the callback function to call when all the dependencies have been
// loaded. This callback function gets passed as parameters an instance of each module dependency.
//
// In our case, we specify both the 'messages' and 'gui' modules as dependencies. Our callback 
// function thus has two parameters: an instance of the 'messages' module and an instance of the
// 'gui' module. Note that the order of the parameters in the callback function is important,
// as the modules are passed as parameters in the same order in which they are defined as a
// dependency. In our case, that means that the first parameter corresponds to the first dependency,
// which is the 'messages' module. The second parameter corresponds to the second dependency, 
// the 'gui' module.
//
// When requiring the 'messages' module, RequireJS will request it from: "scripts/messages.js".
// Similarly, the 'gui' module will be requested from "scripts/gui.js".
define(['messages', 'gui'], function (messages, gui) {
	// We use the 'getHello()' function of the 'messages' module
	// and pass it to the 'gui' module's 'showMessage()' function
    gui.showMessage(messages.getHello());
});