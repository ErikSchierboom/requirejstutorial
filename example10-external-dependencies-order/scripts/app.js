// This JavaScript file defines a module with two explicit dependencies: the 'jquery' and 'bootstrap' modules. 
//  Explicit dependencies are specified in the first parameteras an array of strings. The second parameter is 
// the callback function to call when all the dependencies have been loaded. This callback function gets passed 
// as parameters an instance of each module dependency.
//
// In our case, we specify both the 'jquery' and 'boostrap' modules as dependencies. Our callback 
// function thus has two parameters: an instance of the 'jquery' and 'bootstrap' modules. 
// Note that the order of the parameters in the callback function is important,
// as the modules are passed as parameters in the same order in which they are defined as a
// dependency. In our case, that means that the first parameter corresponds to the first dependency,
// which is the 'jquery' module. The second parameter corresponds to the second dependency, 
// the 'bootstrap' module.
//
// When requiring the 'jquery' module, RequireJS will request it from: "https://code.jquery.com/jquery-2.1.1".
// When requiring the 'bootstrap' module, RequireJS will request it from: "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js".
define(['jquery', 'bootstrap'], function($, bootstrap) {    
	// Execute the callback when DOM has been loaded using the jQuery module
	$(function() {
		// Call the alert function defined by Bootstrap
		$('.alert').alert();
	});
});