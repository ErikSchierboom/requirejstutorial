# Here we first call npm install to load Grunt itself, its CLI and finally the
# Grunt requirejs optimizer module (that calls r.js).
npm install

# Now that Grunt and its dependencies have been installed, we can call its
# 'requirejs' task and run the r.js optimizer
grunt requirejs