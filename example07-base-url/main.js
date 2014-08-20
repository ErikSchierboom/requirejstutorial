// This file can be seen as the entry point (main) of your application, similar
// to how C++ and Java also define a 'main' function as their entry point.

// We can use the 'require' object to configure RequireJS. Here we use it to override
// the base URL to be used.
require.config({	
	baseUrl: 'lib'
});


// Here we indicate to RequireJS that we require the local '../scripts/app' module.
// It is in that module that the actual application logic is located, this file
// is nothing more than an entry point for our application where RequireJS could
// also be configured. This example does not modify the RequireJS configuration.
//
// When loading a module, RequireJS will request it at: "<baseUrl>/<moduleName>.js"
// As we have explicitly configured a base URL, RequireJS will use that value instead
// of the path path of the file to which its "data-main" attribute points to as the base URL. 
//
// In our example, "data-main" is set to "scripts/main" (this file), but the base URL
// has been overridden to 'lib', which means requesting the "app" module would request it
// from "lib/app". However, as it is located in a directory besides the base URL path,
// we use "../scripts/app" to request it relative to the base URL. RequireJS will thus try
// to load the './scripts/app' module by doing a request to: "scripts/app.js".
requirejs(['../scripts/app']);