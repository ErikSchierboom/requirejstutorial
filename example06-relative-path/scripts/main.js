// This file can be seen as the entry point (main) of your application, similar
// to how C++ and Java also define a 'main' function as their entry point.
//
// Here we indicate to RequireJS that we require the local '../lib/app' module.
// It is in that module that the actual application logic is located.
//
// As we have not explicitly configured a base URL, RequireJS will use the path
// of the file to which its "data-main" attribute points as the base URL. 
// In our example, "data-main" is set to "scripts/main" (this file), which means 
// that the base URL used by RequireJS is: 'scripts'.
// 
// When a required module contains the special '../' path, RequireJS will treat that
// as a directive to move up one directory, just like on the file system. When requiring
//  the '../lib/app' module, RequireJS will thus request it from: "lib/app.js"
requirejs(['../lib/app']);