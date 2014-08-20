// This file can be seen as the entry point (main) of your application, similar
// to how C++ and Java also define a 'main' function as their entry point.
//
// We can use the 'require' object to configure RequireJS. Here we use it to 
// specify the path used when the 'jquery' module is require
require.config({
	paths: {
		// Indicate that requests for the 'jquery' module should go to the 
		// specified URL, which must not include the file's extension (.js)
		//
		// In general can use this option to make the URL prettier, so we can just
		// request '<library>' instead of '<library>-<version>'. However,
		// jQuery is an exceptional library that actually forces you to require
		// it as 'jquery' as it registers itself explicity as the 'jquery' module.
		// For more information, see http://requirejs.org/docs/jquery.html
		'jquery': 'https://code.jquery.com/jquery-2.1.1',

        // Indicate that requests for the 'bootstrap' module should go to the 
		// specified URL, which must not include the file's extension (.js)
		'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min'
	},

	shim: {
		// Here we indicate that the 'bootstrap' module depends on the 'jquery' module.
		// If we would not specify this, any library that depends on the 'bootstrap' module
		// would have to remember to also require the 'jquery'. However, even when both
		// the 'jquery' and 'bootstrap' module have been loaded, there is a problem when
		// the explicit dependency below is not specified. That is because RequireJS by default
		// loads all dependencies asynchronously, which means that the bootstrap JS might be
		// loaded before the jQuery JS, which will lead to an error.
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

// Here we indicate to RequireJS that we require the 'app' module.
// It is in that module that the actual application logic is located, this file
// is nothing more than an entry point for our application where RequireJS could
// also be configured. This example does not modify the RequireJS configuration.
//
// When loading a module, RequireJS will request it at: "<baseUrl>/<moduleName>.js"
// As we have not explicitly configured a base URL, RequireJS will use the path
// of the file to which its "data-main" attribute points to as the base URL. 
//
// In our example, "data-main" is set to "scripts/main" (this file), which means 
// that the base URL will be: "scripts". RequireJS will thus try to load the 'app' 
// module by doing a request to: "scripts/app.js".
requirejs(['app']);