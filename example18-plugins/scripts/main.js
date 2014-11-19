// This file can be seen as the entry point (main) of your application, similar
// to how C++ and Java also define a 'main' function as their entry point.
//
// We can use the 'require' object to configure RequireJS. Here we use it to 
// specify the path used when the 'text' module/plugin is required
require.config({
	paths: {
        // Indicate that requests for the 'text' plugin should go to the 
		// specified, local path. This path is relative to the base URL
		// and must not include the file's extension (.js)
		'text': '../lib/text'
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