// This file can be seen as the entry point (main) of your application, similar
// to how C++ and Java also define a 'main' function as their entry point.
//
// We can use the 'require' object to configure RequireJS. Here we use it to 
// specify the path used when the 'singult' module is required and to specify
// the shim to access the non-AMD 'singult' library in an AMD fashion
require.config({
	paths: {
		// Indicate that requests for the 'singult' module should go to the 
		// specified URL, which must not include the file's extension (.js)
		//
		// In general can use this option to make the URL prettier, so we can just
		// request '<library>' instead of '<library>-<version>'. In our example,
		// we use it to be able to require 'singult' and not 'singult.min'
		'singult': '../lib/singult.min'
	},
	shim: {
		// By default, the singult library exports a global variable named 'singult',
		// but is doesn't register it as an AMD module, which means that we can't use
		// it using RequireJS. However, we can work around this problem using the 
		// concept of an explicit export. Below, we specify that the 'singult' module
		// exports an object named 'singult'. Now, when we request the 'singult' module,
		// that exported object will be provided to the requesting module
        'singult': {
            exports: 'singult'
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