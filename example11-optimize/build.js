// This file specifies the configuration to use when using r.js to build
// an optimized version of our main RequireJS file
({
	// Explicity set the base URL. If we would not do this, the base URL
	// would be set to this file's directory, and then our main.js file
	// could not be located correctly
    baseUrl: 'scripts', 

    // The name of the main file optimize. This file will be located at the
    // "<baseUrl>/<name>.js" path, which means "scripts/main.js" in this case
    name: 'main',

    // Specify the file to output the optimized version of our main file to
    out: 'scripts/main-built.js'
})