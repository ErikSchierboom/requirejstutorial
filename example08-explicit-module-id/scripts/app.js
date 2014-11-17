// This JavaScript file defines a module with two explicit dependencies: the 'jquery' and 'messages' modules. 
// Explicit dependencies are specified in the first parameter as an array of strings. 
// The second parameter is the callback function to call when all the dependencies have been
// loaded. This callback function gets passed as parameters an instance of each module dependency.
//
// In our case, we specify the 'jquery' module as a dependency. Our callback 
// function thus has oneparameters: an instance of the 'jquery' module.
//
// When requiring the 'jquery' module, RequireJS will request it from: "lib/jquery-2.1.1.js".
define(['jquery'], function($) {    
	// We use the object defined in the 'messages' module and passed to our
	// callback by RequireJS and call its 'getHello'() function when the
	// DOM has been loaded using the jQuery module
	$(function() {
		alert('Hello World');	
	});    
});