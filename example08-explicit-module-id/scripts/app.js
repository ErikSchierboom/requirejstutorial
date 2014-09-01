// This JavaScript file defines a module with two explicit dependencies: the 'jquery' and 'messages' modules. 
// Explicit dependencies are specified in the first parameter as an array of strings. 
// The second parameter is the callback function to call when all the dependencies have been
// loaded. This callback function gets passed as parameters an instance of each module dependency.
//
// In our case, we specify both the 'jquery' and 'messages' modules as dependencies. Our callback 
// function thus has two parameters: an instance of the 'jquery' module and an instance of the
// 'messages' module. Note that the order of the parameters in the callback function is important,
// as the modules are passed as parameters in the same order in which they are defined as a
// dependency. In our case, that means that the first parameter corresponds to the first dependency,
// which is the 'jquery' module. The second parameter corresponds to the second dependency, 
// the 'messages' module.
//
// When requiring the 'jquery' module, RequireJS will request it from: "lib/jquery.js".
// The 'messages' module will be requested from "lib/utils/messages.js".
define(['jquery', 'messages'], function($, messages) {    
	// We use the object defined in the 'messages' module and passed to our
	// callback by RequireJS and call its 'getHello'() function when the
	// DOM has been loaded using the jQuery module
	$(function() {
		alert(messages.getHello());	
	});    
});