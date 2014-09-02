// This JavaScript file defines a module with one explicit dependency: the 'singult' module. 
// Explicit dependencies are specified in the first parameter as an array of strings. 
// The second parameter is the callback function to call when all the dependencies have been
// loaded. This callback function gets passed as parameters an instance of each module dependency.
//
// In our case, we only specify the 'singult' module as a dependency. Our callback function thus
// has one parameter: an instance of the 'singult' module. When requiring the 'singult' module,
// RequireJS will request it from: "lib/singult.js"
define(['singult'], function (singult) {    
	// We use the object defined in the 'singult' module and passed to our
	// callback by RequireJS to render a Hiccup template
	var hiccup = ['div', {a: 1}, 'Hello World'];
	var element = singult.render(hiccup);

    alert(element.innerText);
});