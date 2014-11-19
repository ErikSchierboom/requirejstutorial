// This JavaScript file defines a module with one explicit dependency: the 'text!main.html' module. 
// Explicit dependencies are specified in the first parameter as an array of strings. 
// The second parameter is the callback function to call when all the dependencies have been
// loaded. This callback function gets passed as parameters an instance of each module dependency.
//
// In our case, we specify the 'text!main.html' module as a dependency. Due to the "text!" prefix,
// RequireJS will use the text plugin to retrieve the data.
//
// When requiring the 'text!main.html' plugin/module, RequireJS will request it from: "scripts/main.html".
define(['text!main.html'], function(mainHtml) {    
	// We alert the text retrieved from the "main.html" file	
	alert(mainHtml);
});