module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Here we configure the 'grunt-contrib-requirejs' module. 
    // This module is nothing more than a simple shell over the r.js tool. 
    // As such, its parameters are also named exactly as when calling r.js from the command line.
    requirejs: {
      compile: {
        options: {

          // Explicity set the base URL. If we would not do this, the base URL
          // would be set to this file's directory, and then our main.js file
          // could not be located correctly
          baseUrl: 'scripts',          

          // The name of the main file optimize. This file will be located at the
          // "<baseUrl>/<name>.js" path, which means "scripts/main.js" in this case
          name: 'main',

          // Specify the file to output the optimized version of our main file to
          out: 'scripts/main-built.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
};