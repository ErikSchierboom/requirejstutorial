# RequireJS tutorial
A tutorial that shows how to use the RequireJS library through a series of samples.

## Why RequireJS?
Although JavaScript is a very popular programming language, it lacks some features programmers take for granted. One of these omissions is a module system, which makes it hard to split JavaScript code into small, re-usable parts. 

Although the next JavaScript version *will* have [support for modules](http://eviltrout.com/2014/05/03/getting-started-with-es6.html), browser support at the moment is virtually non-existent. Luckily, there are JavaScript libraries that add support for modules. [RequireJS](http://requirejs.org/) is such a library. It implements the [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/blob/master/AMD.md), which specifies an API that lets us define and use modules in our JavaScript code. A library that implements the AMD is known as an AMD loader.

## Structure
Although RequireJS is very powerful, its learning curve can be steep. This document aims to slowly build up your knowledge of RequireJS, starting with the basics and gradually moving on to more advanced functionality. We will do this through small, stand-alone examples.

## Basics
Before moving on to the examples, we'll introduce some basic concepts you need to understand when working with RequireJS.

### Defining modules
In the AMD specification, modules are defined using the `define()` function. The `define()` function takes as its argument the JavaScript value to return when the module is requested.

This code defines a module that returns a number:

```javascript
define(5);
```

You can also return an object:

```javascript
define({
    title: 'Master of Puppets',
    artist: 'Metallica',
    year: 1986
});
```

When you need to do some setup work, you can pass a function to `define()`, in which the module's value is returned:

```javascript
define(function() {
    var counter = 0;
    
    // Return the object value that is returned to requesters
    return {
        increment: function() {
            counter++;
        },
 
        getValue: function() {
            return counter;
        }
    };
});
```

### Loading modules
Defining modules is one part of the modules equation, loading them is the other. Just as you use a function to define a module, you use a function to load a module: `require()`.

When you load a module, you refer to it by its module ID, which is just a simple `string`. The `define()` function takes an optional parameter that lets you specify a module's ID:

```javascript
// Define the module with module ID = 'album'
define('album', {
    title: 'Master of Puppets',
    artist: 'Metallica',
    year: 1986
});
```

We can now load this module as follows:

```javascript
require(['album'], function(album) {
    console.log(album.title); // Use the value returned by the 'album' module
});
```

The first parameter of the `require()` function is an array of module IDs, also known as its dependencies. The AMD loader will try to load the modules with the specified module IDs. Once all dependencies have been loaded, the callback function passed as the second parameter is called. The values returned by each module will be passed as arguments to the callback function, in the order specified by the dependencies array.

In our example, there is only one dependency: the module with ID `'album'`. Consequently, our callback method also has only one parameter, which will contain the value returned by the `'album'` module.

If a module does not explicitly specify a module ID, the AMD loader will define one for it based on the URL at which it is requested. This means that if you don't explicitly define a module ID, moving a module file to another location changes its module ID. Exactly how a module's ID is inferred from its URL will be discussed later.

In general, it is considered bad practice to specify an ID for your modules, as you lose the link between URL and module ID. This makes determining a module's ID less obvious.

### Module dependencies
So far, our modules did not depend on other modules. A module can depend on other modules by passing an array of the module IDs it depends on as its first parameter. The second parameter is the callback function that is called when all dependencies have been loaded. This is similar to our previous `require()` example. Within the callback function, we return our module's value:

```javascript
// Define a module with (two) dependencies
define(['album', 'counter'], function(album, counter) {
    return function() {
        counter.increment();

        return album.title + " requested " + counter.getValue() + " times";
    }
});
```

Note that the callback function's parameters are defined in the order of its dependencies. This means that the first parameter will get passed the value of the first module dependency (`'album'`); consequently, the second parameter corresponds to the `'counter'` module.

### Main file
Another important concept is that of a main file. When you include RequireJS in your application, you have to point it to a JavaScript file that will be used as your application's entry point, your main file. When your application runs, RequireJS will automatically load this main file and its code will be executed. 

The function of the main file is twofold:

* Run your application
* Configure RequireJS (optional)

To run your application, usually you load another module. You do this through the `requirejs` function, which will automatically be available in your main file. The following code is the most basic main file, which just loads the `'app'` module:

```javascript
requirejs(['app']);
```

The `'app'` module contains the actual application logic. You could define your application logic in the main file itself, but it is good practice to keep it out of your main file.

The second function of the main file is to configure RequireJS. Configuring is done by passing the configuration options as an object parameter to `require.config`:

```javascript
require.config({
    // Specify configuration options
});
```

For the moment, we won't go into the various [configuration options](http://requirejs.org/docs/api.html#config). We'll see some of them later.

### Module paths
The last concept we need to introduce is that of module paths. When RequireJS requests a module, it loads that module using this template: `<base URL>/<module ID>.js`. 

By default, the base URL is set to the path from which the main file is loaded. So if the main file is located at `scripts/main.js`, the base URL is set to `scripts`. Using this base URL, a request for the `'app'` module translates to a request to `scripts/app.js`. If the base URL was `frontend/js` and the module ID `'utils/message'`, the module would be loaded from `frontend/js/utils/message.js`.

Using this template, it is possible to determine a module's ID by knowing the base URL and the URL at which the module can be found. So if you have a module that is located at `scripts/utils/messages.js` and you know the base URL is `scripts`, the module ID is thus `'utils/messages'`.

Note that it is possible to customize the base URL, which will be discussed later.

## Examples
Now that we have learned the basics, we are ready to move on to our examples. We encourage you to clone this repository to your local machine to examine and play with the examples yourselves. The code for each example is in a separate directory. 

### Example 1: basic usage
Our first step to create a RequireJS application is to download the [`require.js`](http://requirejs.org/docs/download.html) library. We will store this file in a directory named `lib`.

We then create an HTML file named `index.html` in the root of our directory. In this file we include the `require.js` file we just downloaded:

```html
<!DOCTYPE html>
<html>
    <head>
        <script data-main="scripts/main" src="lib/require.js"></script>
    </head>
    <body>
        <h1>Example 1: basic usage</h1>
    </body>
</html>
```

One thing stands out: the `data-main` attribute of the `<script>` tag with source `lib/require.js`. This `data-main` attribute points to the JavaScript file that will automatically be loaded by RequireJS when the page is loaded: the main file. Note that the `data-main` value omits the `.js` extension; this is required as RequireJS will add the extension itself. 

In our example, we set `data-main` to `scripts/main`, which means that RequireJS will try to load the main file from `scripts/main.js` file. Our next step is to create this file.

As noted, the `main.js` file can be seen as the main entry point of your JavaScript application. In this file, two things can be done:

1. Run your application
2. Configure RequireJS (optional)

In this example, we'll ignore the configuration options. To run our application, we could put the application logic in our `main.js` file, but the whole purpose of RequireJS is to use modules so let's use that.

By convention, most main files load a module named `'app'`, which contains the application logic. Our main file is nothing more than an entry point. Applying this to our example results in the following main file:

```javascript
requirejs(['app']); // Load the 'app' module
```

The final step is to create the `'app'` module, which just shows an alert when it is loaded:

```javascript
define(function () {
    alert('Hello World');
});
```

But where should we save our `'app'` module? By default, the base URL is set to the main file's path. As our main file was found at `scripts/main.js`, modules will be loaded from `scripts/<module ID>.js`. We thus save our `'app'` module in `scripts/app.js`:

Now when you open the `index.html` file in a browser, the following things happen:

1. The RequireJS file is loaded from `lib/require.js`
2. RequireJS loads the main file from `scripts/main.js`
3. The main file loads the `'app'` module from `scripts/app.js`
4. The `'app'` module shows the alert message

This chain of requests is typical of a RequireJS application. You start with a request for the RequireJS library, which requests the main file, which then requests a module. This module can then also request other modules (its dependencies), and so on. 

#### Structure
The end result of this example, when looking at it from a file viewpoint, looks like this:

<pre>
.
├── lib
|   └── require.js
├── scripts
|   ├── app.js
|   └── main.js
└── index.html
</pre>

And we now have a working RequireJS application!

### Example 2: load module using explicit dependency syntax
In our previous example, the `'app'` module did not depend on another module. Let's change that. First, we'll define the `'messages'` module that the `'app'` module will use:

```javascript
define(function () {
    return {
        getHello: function () {
            return 'Hello World';
        }
    };
});
```

This module returns an object with one function, `getHello()`, which returns a string.

We can now have our `'app'` module use the `'messages'` module by specifying it as a dependency in the `'app'` module:

```javascript
define(['messages'], function (messages) {
    alert(messages.getHello()); // Alerts 'Hello World'
});
```

The dependency on the `'messages'` module is specified by passing its module ID in array form as the `define()` function's first parameter. When RequireJS loads the `'app'` module, it will see this dependency and start loading the `'messages'` module first. Once the `'messages'` module has been been loaded, RequireJS will call the `'app'` module's callback function with the value returned by the `'messages'` module as its parameter.

### Example 3: load module using the require() function
Sometimes, a module's dependencies are not know beforehand, or you might want to defer loading them to a later time. This scenario is be supported by modifying a module's definition to not take an array of dependencies, but only a callback with a single parameter. This parameter is a function that can take a module ID and load that module.

In our previous example, the `'app'` module explicitly defined its dependency on the `'messages'` as follows:

```javascript
define(['messages'], function (messages) {
    alert(messages.getHello()); // Alerts 'Hello World'
});
```

We can get the same behavior by using the `require` parameter option:

```javascript
define(function (require) {
    var messages = require('messages');
    alert(messages.getHello());
});
```

In general, the first option is preferred as it makes finding a module's dependencies easier. The second option is usually reserved for more advanced use cases, e.g. when you don't know a module's dependencies beforehand.

### Example 4: load multiple modules using explicit syntax
So far, our modules only had a single dependency. To depend on more than one module, simple add the other module IDs to the dependencies array:

```javascript
define(['messages', 'gui'], function (messages, gui) {
    gui.showMessage(messages.getHello());
});
```

The following module depends on both the `'messages'` and `'gui'` modules.

One can see that the order of the parameters in the callback function must correspond to the order of the dependencies.

Note that the dependent modules are requested in parallel, no guarantees are made which of the modules loads first. However, RequireJS does guarantee that the callback function is only called when *all* modules have been loaded successfully. If one or more modules failed to load, the callback function will not be called.

### Example 5: namespaces
Although JavaScript has no native concept of namespaces, we can simulate them using RequireJS. For this, we use the fact that a module's ID is determined by its URL.

Consider the following directory structure:

<pre>
.
├── lib
|   └── require.js
├── scripts
|   ├── utils
|   |   ├── output
|   |   |   └── gui.js
|   |   └── messages.js
|   ├── app.js
|   └── main.js
└── index.html
</pre>

The `main.js` and `app.js` files are in the `scripts` directory, which will be the base URL. The `'app'` module has two dependencies:

```javascript
define(['utils/messages', 'utils/output/gui'], function (messages, gui) {
    gui.showMessage(messages.getHello());
});
```

When looking at the dependencies, one could argue  that the `'messages'` module appears to be part of the `utils` namespace and the `'gui'` module is part of the `utils/output` namespace.

### Example 6: load modules using a relative path
So far, modules were always defined in the same directory as our main file or in a sub-directory, but what to do with modules outside of this path? 

Let's illustrate this problem with an example:

<pre>
├── lib
|   ├── app.js
|   ├── messages.js
|   └── require.js
├── scripts
|   └── main.js
└── index.html
</pre>


Our base URL here is `scripts`. That means that we cannot load the `'app'` module from our `main.js` file as follows:

```javascript
requirejs(['app']); // The module will fail to load
```

Requesting the `'app'` module like this, RequireJS will try to load it from `scripts/app.js`, which is not its correct location.

What we want is to first go up one directory from our base URL (we are now at the root) and then load the `lib/app.js` file. To do this, we use the special `..` path:

```javascript
requirejs(['../lib/app']);
```

When RequireJS tries to load the `'../lib/app'` module, it first prepends the base URL: `scripts/../lib/app.js`. This path simplifies to `lib/app.js`, which is the correct path for the `'app'` module.

In the `'app'` module, we want to use the `'messages'` module, which is also outside the base URL. Once again, we could use the `..` special path:

```javascript
define(['../lib/messages'], function (messages) {
    alert(messages.getHello());
});
```

This code works, but there is an even better option. The special `.` path means: "load the module relative to the current module". This option bypasses the base URL and uses the path of the module in which it is used. 

We could thus also include the `'messages'` module as follows:

```javascript
define(['./messages'], function (messages) {
    alert(messages.getHello());
});
```

### Example 7: custom base URL
Up until now, the base URL used by RequireJS was always determined by the main file's location. However, you can explicitly set the base URL in your main file:

```javascript
require.config({    
    baseUrl: 'lib'
});
```

To see how this influences an application, considere the follows folder structure:

<pre>
.
├── lib
|   ├── require.js
|   └── messages.js
├── scripts
|   └── app.js
├── main.js
└── index.html
</pre>

Our main file is located in the root. By default, the `'messages'` module's ID would thus be `'lib/messages'`. However, as we set the base URL to `lib`, its module ID becomes just `'messages'`.

The `'app'` module can thus request the `'messages'` module as follows:

```javascript
define(['messages'], function (messages) {    
    alert(messages.getHello());
});
```

Finally, to load the `'app'` module from the `main.js` file, we have to use a path relative to our custom `lib` base URL:

```javascript
requirejs(['../scripts/app']);
```

### Example 8: explicit module ID
Sometimes, you want to decouple a module's ID from its actual path. This can be done in the main file's configuration section. This feature is mostly used when working with external libraries. 

Say we have the following directory structure:

<pre>
.
├── lib
|   ├── jquery-2.1.1.js
|   └── require.js
├── scripts
|   └── app.js
├── main.js
└── index.html
</pre>

If the `'app'` module depends on jQuery, it would be defined like this:

```javascript
define(['../lib/jquery-2.1.1'], function($) {    
    // ...
});
```

Not only does this path not look pretty, it also includes the version number, which means that each upgrade of the jQuery library requires us to modify all modules that depend on it.

A much more elegant solution is to explicitly define a module ID for the jQuery module in the main file:

```javascript
require.config({
    paths: {
        'jquery': '../lib/jquery-2.1.1'
    }
});
```

What we have done is instruct RequireJS that when the `'jquery'` module is requested, it should load it from `lib/jquery-2.1.1.js` (as the base URL is the root directory).

Our `'app'` module now looks like this:

```javascript
define(['jquery'], function($) {    
    // ...
});
```

Note that if you work with the jQuery library, its module ID in fact **must** be equal to `'jquery'`. For more information, see [how to use RequireJS with jQuery](http://requirejs.org/docs/jquery.html).

### Example 9: external URL
Up until now, all our modules were stored locally. However, it is also possible to load a module from an external URL. One use case for this would be to load a module from a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network). To load a module from an external URL, we just set the path of the module to an URL:

```javascript
require.config({
    paths: {
        'jquery': 'https://code.jquery.com/jquery-2.1.1'
    }
});
```

Now when the `'jquery'` module is requested, it will be loaded from `https://code.jquery.com/jquery-2.1.1.js`.

### Example 10: fallback paths
When requesting a module, there is always the possibility that the module could not be loaded. This is especially true when you load a module from an external URL. To gracefully handle failure to load a module, RequireJS allows you to define a fallback path, which is used when the module could not be loaded from the original path. 

To add a fallback, you define the module's path as an array of strings:

```javascript
require.config({
    paths: {
        'jquery': ['https://code.jquery.com/jquery-2.1.1', '../lib/jquery-2.1.1']
    }
});
```

What happens is that when the `'jquery'` module is requested, RequireJS will first try to load it by using the first path in the array. If that request fails, RequireJS will move to the next path in the array and try that, repeating this until either the module was loaded successfully or there are no more paths left to try. 

The fallback option is often used when loading a module from an external URL, where a locally hosted file is used as a fallback. In our example, we instruct RequireJS to first try to load jQuery from an external URL, but upon failure to fall back to a local version of that file.

Note that you could add more than one fallback by just adding more paths to the array:

```javascript
require.config({
    paths: {
        'jquery': ['https://code.jquery.com/jquery-2.1.1', 
                   'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery',
                   'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1',
                   '../lib/jquery-2.1.1']
    }
});
```

### Example 11: dependencies order
When working with multiple libraries, it is not uncommon for one library to depend on another. An example of this is the [Bootstrap](http://getbootstrap.com/) library, which depends on [jQuery](http://jquery.com/). The first step is thus to define the paths to our our libraries:

```javascript
require.config({
    paths: {
        'jquery': '../lib/jquery-2.1.1',
        'bootstrap': '../lib/bootstrap'
    }
});
```

We could use these modules as follows:

```javascript
define(['jquery', 'bootstrap'], function($, bootstrap) {        
    $(function() {        
        $('.alert').alert();
    });
});
```

When you would run this code, you'd find that it would not always work. This is because RequireJS will request the `jquery` and `bootstrap` modules in parallel. When the `jquery` module loads first, everything is fine. However, if the `bootstrap` module is the first to load, it will throw an exception as its dependency jQuery has not yet been loaded. The key thing to note is that the order in which you define your dependencies does not have to correspond to the order in which they are loaded.

To fix this problem, we have to do some additional configuration in our main file. There, you can define a `shim` section in which modules can be configured individually. To solve our dependency problem, we mark the `'jquery'` module as a dependency of the `'bootstrap'` module using the `deps` property:

```javascript
require.config({
    paths: {
        'jquery': '../lib/jquery-2.1.1',
        'bootstrap': '../lib/bootstrap'
    },

    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});
```

Now when the `'bootstrap'` module is loaded, RequireJS will first load the `'jquery'` module. Only when the `'jquery'` has loaded successfully, will the `'bootstrap'` module be loaded. This fixes our dependency problem.

Note that dependencies are defined as an array, which means that a module can have more than one dependency.

### Example 12: optimize RequireJS using r.js
By default, RequireJS will issue a request for each module its loads. Therefore, lots of modules means lots of requests. Obviously, this is not good for performance. Ideally, we would only load a single, minified file that contains all modules. For this, the [`r.js`](http://requirejs.org/docs/optimization.html) tool was developed. You run the `r.js` tool on a specific file, and `r.js` will then trace that file's dependencies, combine all of those dependencies and write them to a single file.

Using `r.js` is very simple. You can choose to run it on node.js, Java or in the browser. We will use node.js in our example. To use r.js in node, install it using the following command:

`npm install -g requirejs`

At this point, we now have two options:

1. Run `r.js` using command-line parameters
2. Run `r.js` with a build profile

The build profile and command-line options can do exactly the same things, they just have a different way of doing them. 

In our example, we'll use a build profile, which is just a JavaScript file containing the configuration options. Here is our example's build profile:

```javascript
({
    name: 'main',   
    out: 'main-built.js'
})
```

We specify two configuration options:

* **name**: the name of the file to optimize. From this file, `r.js` will start to analyze the dependency chain. Usually, this would point to the main file.
* **out**: the name of the file to which the optimized output should be written.

Now we can run the following command to create our optimized `main-built.js` file:

```node r.js -o build.js```

Once the command has completed, the optimized output will have been written to `main-built.js`. This file not only contains the main file, but also all modules it depends on.

The last step is to use our optimized file instead of our old main file:

```html
<script data-main="scripts/main-built" src="lib/require.js"></script>
```

Now, there would be only a single request to the `scripts/main-built.js` file, instead of issuing a request for each module.

### Example 12: optimize using external dependendies
If you configured a module with an external URL (see example 9), you would expect `r.js` to not include this file when optimizing. However, if you would run `r.js` on a file that has external dependencies, you would get an error message. The problem is that `r.js` by default includes all dependent modules in the output file, but that it cannot work with external files. To work around this, you need to instruct `r.js` to ignore the modules that are loaded from an external URL.

In our example, we used an external URL for the `'jquery'` module. We can instruct `r.js` to ignore the `'jquery'` module by setting its path to the special value: `'empty:'`:

```javascript
({
    name: 'main',
    out: 'main-built.js',
    paths: {
        'jquery': 'empty:'
    }
})
```

Now when you run `r.js`, the optimized `main-built.js` file will not contain the `'jquery'` module and RequireJS will load it from its external URL.

### Example 14: optimize using Grunt
In the previous examples, we ran the `r.js` tool from the command-line. However, you can also run `r.js` from [Grunt](http://gruntjs.com/). First, install the following Node module:

```
npm install grunt-contrib-requirejs --save-dev
```

Then enable this task by adding the following to your `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-contrib-requirejs');
```

We are now ready to configure the `r.js` optimization task in our Gruntfile:

```javascript
requirejs: {
  compile: {
    options: {
      name: 'main',
      baseUrl: 'scripts',
      out: 'scripts/main-built.js'
    }
  }
}
```

The supported configuration options are the same as when working directly with `r.js`. Note that if you do not explicitly set the base URL, the base URL will be equal to the path in which the `Gruntfile.js` file is located. As our main file is actually in the `scripts` directory, we needed to explicitly set the base URL.

Now we can build the optimized version of our main file using:

```
grunt requirejs
```

When this command finishes, an optimized `main-built.js` file will have been created.

### Example 15: load non-AMD module
Although many libraries define themselves as AMD modules, not all of them do. For those libraries, RequireJS supports the concept of a *shim*. Using *shims*, one can access non-AMD modules as if they were defined as AMD modules.

Take the [`singult`](https://github.com/lynaghk/singult) library (which can compile [Hiccup](https://github.com/weavejester/hiccup) templates). Instead of registering itself as an AMD module, it exports a global variable named `singult`. We thus need to tell RequireJS that when the `singult` module is requested, it should return the global `singult` variable. We do this in the `shim` configuration section of our main file:

```javascript
require.config({
	paths: {
		'singult': '../lib/singult.min'
	},
	shim: {
        'singult': {
            exports: 'singult'
        }
    }
});
```

With this simple modification, we can now use the `singult` library like an AMD module:

```javascript
define(['singult'], function (singult) {	
	var hiccup = ['div', {a: 1}, 'Hello World'];
	var element = singult.render(hiccup);
});
```

### Example 16: unit testing
If you want to unit test using RequireJS, your unit test framework must support asynchronously loading tests. Luckily, most popular test frameworks [support this](https://github.com/jrburke/requirejs/wiki/Test-frameworks). In our example, we'll use [QUnit](http://qunitjs.com/) as our test framework.

Let's start with the module we'll be testing:

```javascript
define(function () {
    return {
        add: function (x, y) {
            return x + y;
        }
    };
});
```

Well save this module in `scripts/math.js`. The next step is to define our test module:

```javascript
define(['QUnit', 'scripts/math'], function(QUnit, math) {
    test('add should add positive numbers.', function() {
        equal(math.add(3, 4), 7, 'The return should be 7.');
        equal(math.add(5, 3), 8, 'The return should be 8.');
    });

    test('add should add negative numbers.', function() {
        equal(math.add(-1, -2), -3, 'The return should be -3.');
        equal(math.add(-2, -3), -5, 'The return should be -8.');
    });
});
```

The test module is a regular RequireJS module, with a dependency on the `'scripts/math'` module (which functionality is tested) and the `'QUnit'` module for the `test()` function.

The next step is to create the HTML file that will be our test runner:

```html
<!DOCTYPE html>
<html>
    <head>
      <link rel="stylesheet" href="lib/qunit-1.15.0.css">

      <!-- Include the RequireJS library. We supply the "data-main" attribute to 
           let RequireJS know which file it should load. This file (runner.js) 
           can be seen as the entry point (main) of the application. -->
      <script data-main="runner" src="lib/require.js"></script>
    </head>
    <body>
      <!-- This empty divs will be filled with the test results when QUnit 
           has run its tests -->
      <div id="qunit"></div>
      <div id="qunit-fixture"></div>
    </body>
</html>
```

This file is similar to the HTML files we used in other examples, with some small differences:

* A reference to the QUnit stylesheet has been added to style the test output
* The RequireJS main file is now named `runner`. This is a convention, where the JavaScript file responsible for running the tests is called a *runner* (or *testrunner*)
* Two empty `<div>` elements were added, which QUnit uses to display the test results

The final step is to create the `runner.js` file, which is our RequireJS main file that acts as the test runner. In this file, we need to do several things:

* Allow QUnit to be loaded as an AMD module. This is done by defining a `shim` section for `'QUnit'` with an `exports` section
* Configure QUnit to not immediately start running the tests, as they'll be loaded asynchronously later. For this, we use the `init` configuration option in the `shim` section, which takes a function to execute when the library has been loaded.
* Load the test module(s) using RequireJS and once they have been loaded, have QUnit start running its tests.

We end up with the following `runner.js` file:

```javascript
require.config({
    paths: {
        'QUnit': 'lib/qunit-1.15.0'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               // When the QUnit module is loaded, we have to 
               // configure it to not automatically start running
               // the tests as they'll be loaded later on
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       } 
    }
});

// require the QUnit library and all test module
require(['QUnit', 'tests/mathtests'], function(QUnit, mathTests) {
    // Now that we have asynchronously loaded the tests
    // we can give QUnit the signal to start running the tests
    QUnit.load();
    QUnit.start();
});
```

Now we are ready to run our tests by simply viewing our `index.html` test runner file in a browser.

#### Structure
The resulting folder structure is as follows:

<pre>
.
├── lib
|   ├── qunit-1.15.0.css
|   ├── qunit-1.15.0.js
|   └── require.js
├── scripts
|   └── math.js
├── tests
|   └── mathtests.js
├── index.html
└── runner.js
</pre>

### Example 17: unit testing using Grunt
In the previous example, we used a browser to run our unit tests. But what if you want to run RequireJS unit tests using Grunt, where code runs on the server and not in a browser?

For this purpose, you can use the [`grunt-contrib-qunit`](https://github.com/gruntjs/grunt-contrib-qunit) plugin. This plugin can run your test runner HTML file(s) in a *headless browser*, which is basically full-featured browser without a GUI. We configure the `grunt-contrib-qunit` plugin as follows:

```javascript
grunt.initConfig({
  qunit: {
    all: {
      options: {
        urls: [
          'http://localhost:8000/index.html'
        ]
      }
    }
  }
});
```

Now when you run `grunt qunit`, you'll probably get an exception that the specified URL failed to load. This is because the `grunt-contrib-qunit` doesn't actually host anything. For this, we can use the [`grunt-contrib-connect`](https://github.com/gruntjs/grunt-contrib-connect) plugin, which is a simple, lightweight web-server. In our example, we configure the `connect` webserver to run at port `8000`, where the current directory is used as the webserver's root:

```javascript
grunt.initConfig({
  connect: {
    server: {
      options: {
        port: 8000,
        base: '.'
      }
    }
  }
});
```

The next step is to register the plugins with Grunt:

```javascript
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-connect');
```

The final step is to combine these two plugins and assign them to the `test` task:

```javascript
grunt.registerTask('test', ['connect', 'qunit']);
```

Now, we can run `grunt test` which first starts the `connect` webserver and then runs the QUnit test runner. Unfortunately, if you try this you'll get the following error message:

`PhantomJS timed out, possibly due to a missing QUnit start() call.`

This is due to a race condition, where the code to disable automatically running the tests is executed too late. To work around this, we load and configure QUnit before we run our RequireJS code. This results in the following, modified `index.html` file:

```html
<!DOCTYPE html>
<html>
    <head>
      <link rel="stylesheet" href="lib/qunit-1.15.0.css">

      <!-- Include the QUnit library. Ideally, we'd include this as a
           dependency in our RequireJS main file, but due to a race condition
           this would fail. -->
      <script type="text/javascript" src="lib/qunit-1.15.0.js"></script>

      <script type="text/javascript">
          // Configure QUnit to delay running the tests. We will start running 
          // the testswhen they have been asynchronously loaded using RequireJS
          QUnit.config.autoload = false;
          QUnit.config.autostart = false;
      </script>

      <!-- Include the RequireJS library. We supply the "data-main" attribute to
           let RequireJS know which file it should load. This file (runner.js) 
           can be seen as the entry point (main) of the application. -->
      <script data-main="runner" src="lib/require.js"></script>
    </head>
    <body>
      <!-- This empty divs will be filled with the test results when QUnit 
           has run its tests -->
      <div id="qunit"></div>
      <div id="qunit-fixture"></div>
    </body>
</html>
```

Of course, this also means that our `runner.js` changes, as we no longer need to load QUnit from it:

```javascript
// require the test modules
require(['tests/mathtests'], function(mathTest) {
    // Now that we have asynchronously loaded the tests
    // we can give QUnit the signal to start running the tests
    QUnit.load();
    QUnit.start();
});
```

With the modifications, we can now run `grunt test` and our tests will correctly execute.

### Conclusion
RequireJS is a very useful library that fills a gap in the JavaScript language: a missing module system. Its learning curve can be steep, but when mastered you'll have the tools to better structure your JavaScript applications.

## License
[Apache License 2.0](LICENSE)