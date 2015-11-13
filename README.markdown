Marionette-Require-Boilerplate (MRB)
==================================
![Example](http://www.sidnet.info/sites/default/files/marionette-logo.png)   ![Example](http://3.bp.blogspot.com/-JFOJ-k6tLnA/TsiKgBYPvqI/AAAAAAAAAT8/dGXeu0LeuTE/s320/backbone-js-logo.png) ![Example](http://requirejs.org/i/logo.png)


#Description
> A Marionette.js and Require.js Boilerplate that promotes decoupling your JavaScript into modules, separating business logic from application logic using Collections/Models, Regions and Views, reusing your JavaScript between Desktop and Mobile Web versions while using a mobile framework (jQuery Mobile), including non-AMD Compatible Third Party Scripts in your project, optimizing your JavaScript and CSS files (minify, concatenate, etc), and unit testing your JavaScript.  Part of the [BoilerplateMVC](https://github.com/BoilerplateMVC) suite.

#Getting Started
   1. Download and install [Node.js](http://nodejs.org/#download)
   2. Clone this repository
   3. On the command line, type `npm install nodemon -g` to install the [nodemon](https://github.com/remy/nodemon) library globally.  If it complains about user permissions type `sudo npm install nodemon -g`.
   4.  If you have installed [Grunt](http://gruntjs.com/) globally in the past, you will need to remove it first by typing `npm uninstall -g grunt`.  If it complains about user permissions, type `sudo npm uninstall -g grunt`.
   5.  Next, install the latest version of [Grunt](http://gruntjs.com/) by typing `npm install -g grunt-cli`.  If it complains about user permissions, type `sudo npm install -g grunt-cli`. 
   6. Navigate to inside of the **Backbone-Require-Boilerplate** folder and type `npm install`
   7. Next, type `nodemon` (this will start your Node.js web server and restart the server any time you make a file change thanks to the wonderful **nodemon** library)
   8. To view the demo page, go to `http://localhost:8001`
   9. To view the Jasmine test suite page, go to `http://localhost:8001/specRunner.html`
   10. Type `grunt` to run your grunt build and create minified .js and .css files   
   11. Enjoy using Marionette, Backbone, Require, Grunt, Lodash, jQuery, jQueryUI, jQuery Mobile, Twitter Bootstrap, and Handlebars!

#Tour of the Boilerplate Files

index.html
----------

### HTML5 Boilerplate

Uses a large portion of the [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) HTML and CSS.

### Environment

As you continue down the page to the first `<script>` tag, you will notice there is a local JavaScript variable, called `production`, that is used to communicate to your application whether you would like to load production or development CSS and JavaScript files.

### BoilerplateMVC Helper Methods

To load our production/development CSS and JavaScript files, you can use the handy BoilerplateMVC helper methods included directly in our HTML page.  Below are the available helper methods:

   `loadCSS(url, callback)` - Asynchronously includes a CSS file to a page

   `loadJS(file, callback)` - Asynchronously includes a JavaScript file to the page

   `loadFiles(production, obj, callback)` - Calls the `loadCSS()` and `loadJS()` methods internally to asynchronously include our CSS and JavaScript files 

   **Note:** Require.js does not officially support [loading CSS files](http://requirejs.org/docs/faq-advanced.html#css), which is why we included the `loadCSS()` method to asynchronously include our CSS files.

   Loading files asynchronously prevents our application files from blocking the loading of the UI and allows us the flexibilty to load different CSS/JavaScript files if a user is on a mobile/desktop device.

   Since the Desktop/Mobile versions of the boilerplate point Require.js to two different files, including Require.js asynchronously with the `loadJS` method provides the flexibility to do that.

### Mobile Detection Script

There is a simple JavaScript mobile browser detection script that stores different production/development CSS and JavaScript files within a local `config` object based on whether a user is using a mobile or desktop browser.

> You do not need to use the provided JavaScript mobile detection script for your application. We provided it for convenience so that you could see an example of how to separate your Mobile and Desktop JavaScript logic using Require.js.

### Production Mode

In production mode, your app's single minified and concatenated JavaScript file is loaded using Almond.js instead of Require.js.  Your application's minfied common CSS file is also included.

### Development Mode

In development mode, your app's non-minified JavaScript files are loaded using Require.js instead of Almond.js.  Your application's non-minified common CSS file is also included.

Config.js
---------

This file includes your mobile **AND** desktop Require.js configurations.

If we look at our App's Require.js configurations, we will see the first thing being configured are the module paths.  Setting paths allow you to define an alias name and file path for any module that you like.

Typically, you want to set a path for any module that will be listed as a dependency in more than one other module (eq. jQuery, Backbone).  This saves you some typing, since you just have to list the alias name, and not the entire file path, when listing dependencies.  After all of the file paths are set, you will find the Shim configuration (Added in Require.js 2.0).
   
The Shim configuration allows you to easily include non-AMD compatible JavaScript files with Require.js (a separate library such as [Use.js](https://github.com/tbranyen/use-amd) was previously needed for this). This is very important, because Backbone versions > 0.5.3 no longer support AMD (meaning you will get an error if you try to use both Require.js and the latest version of Backbone).  This configuration is a much better solution than manually editing non-AMD compatible JavaScript files to make sure the code is wrapped in a `define` method.  Require.js creator [James Burke](http://tagneto.blogspot.com/) previously maintained AMD compatible forks of both Backbone.js and Underscore.js because of this exact reason.

```js
   shim: {

      // Backbone
      "backbone": {

         // Depends on underscore/lodash and jQuery
         "deps": ["underscore", "jquery"],

         // Exports the global window.Backbone object
         "exports": "Backbone"

      },

   }
```

The Shim configuration also takes the place for the old Require.js `order` plugin.  Within the Shim configuration, you can list files and their dependency tree.  An example is jQuery plugins being dependent on jQuery:

```js
   shim: {

      // Twitter Bootstrap plugins depend on jQuery
      "bootstrap": ["jquery"]

   }
```

> You do not need a shim configuration for [jQuery](http://jquery.com/) or [lodash](https://github.com/lodash/lodash) because they do not have any dependencies.

MobileInit.js
-------------
MobileInit.js is only used if a mobile browser is detected.

The `require` method is used to asynchronously include all of the files/dependencies passed into the first parameter (jQuery, Backbone, Lodash, mobileRouter, etc) into the page.

After all of those files are included on the page, two internal jQuery Mobile properties are turned off to allow Backbone.js to handle all of the routing.

```js
   // Prevents all anchor click handling
   $.mobile.linkBindingEnabled = false;

   // Disabling this will prevent jQuery Mobile from handling hash changes
   $.mobile.hashListeningEnabled = false;
```

Finally, a new [Marionette.Application](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md) instance is instantiated to get your Marionette app up and running.

> You don't need to instantiate a new router instance if you aren't using a Backbone Router class.

DesktopInit.js
--------------
DesktopInit.js is only used if a desktop browser is detected.

This file is the exact same as MobileInit.js, except it has a few different dependencies (Twitter Bootstrap instead of jQuery Mobile, etc), and instead of loading MobileController to handle the Routes defined in AppRouter, it loads DesktopController to handle these routes.  This is one of many possible ways to handle the necessary differences between Desktop and Mobile devices. There are others, so take it or leave it.


App.js
------
   App.js is where we instantiate our globally accessible `Marionette.Application` object.  This file starts with a define method that lists Backbone and Marionette as dependencies. Keep in mind that Backbone and Marionette had already been previously loaded in MobileInit.js/DesktopInit.js, but Require.js is smart enough not to load dependencies more than once.

   It is best practice to list out all of your dependencies for every file, regardless of whether or not they expose global objects and are already included in the page.  This is also especially important for the Require.js optimizer (which needs to determine which files depend on which other files).  

> If your dependencies do not expose global objects, then it is absolutely mandatory to list it as a dependency, since Require.js does not allow global variables (meaning your modules are private and cannot be accessed by other modules or code without explicitly listing them as dependencies).

   [Marionette.Application](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md) is the heart of the Marionette framework.  The [Regions](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md), [Layouts](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.layout.md) and [AppRouters](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.approuter.md) you create are typically hung off of a global instance of `Marionette.Application`.  

   One of Marionette's strengths is that it introduces a Composite architecture, which lets you organize your application into separate regions or areas, with their own self-contained logic and structure.  One of the main ways this can be done is with [Regions](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md).  In App.js, we divide our application into two regions - the `headerRegion` and `mainRegion`, like so:

        App.addRegions({
            headerRegion:"header",
            mainRegion:"#main"
        });

   This searches the DOM for a `<header>` element and for an element with an `id` of `main` and creates a new `Marionette.Region` for each.  Regions have a `show` method which can be passed a `View`.  When a view is passed to a `Region.show`, the view is appended to the Regions associated DOM element and its `render` method is triggered.  An associated `close` method is also available, which contains some basic logic for tearing down the Region's view.  We will see how `show` is used later in MobileController.js.

App.js also has an initializer method which expects to be passed a set of options containing a `mobile` flag.  This `mobile` flag gets set as `App.mobile`, and can then be used throughout the application to determine whether we are running in mobile or desktop mode.  Depending on this setting, either `DesktopController` or `MobileController` is loaded along with our `AppRouter`, as described below.

AppRouter.js
------------
   AppRouter.js is where you can configure application-level routing paths.  It is a simple example of a Marionette.js AppRouter class, which is a variation of a Backbone.Router.  AppRouter's allow you to configure routes in an `appRoutes` map.  When a route in `appRoutes` is fired from a hash change event, it gets handled in the AppRouter's associated `controller` attribute object.  `AppRouter.controller` can actually be any object with method names that match the values in `appRoutes`, but Marionette provides a simple `Marionette.Controller` object which can be used for this purpose, and which provides Marionette event-handling and an `initialize` method.  

Here is a simple example of how a Marionette.Controller and Marionette.AppRouter interact:
        
        var AppRouter = new Backbone.Marionette.AppRouter({
           //"home" must be a method in AppRouter's controller
           appRoutes: {
               "home": "home"
           }, 
           controller: new Backbone.Marionette.Controller({
                home: function() {
                    //do something
                }
            })
        });

   Here we see that when a URL change event occurs and the URL hash matches `#home`, the `home` method in `AppRouter.controller` will be fired.  In our application, we implement a different Controller for Mobile than for Desktop.  This is just an optional way to handle differences between Mobile and Desktop versions of the application - the same routes will be handled by different controllers depending on the user's device.  There is currently only one appRoute listed in AppRouter.js (which gets called if there is no hash tag on the url), but feel free to create more for your application.

MobileController.js
----------------
   MobileController.js is an example of a `Marionette.Controller` as described above.  Please note that a Controller in Marionette is different than a typical MVC controller.  Read more about it [here](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.controller.md).  In MobileController's `initialize` method, we show our first View, `MobileHeaderView` in the `App.headerRegion` region. 

        initialize:function (options) {
            App.headerRegion.show(new MobileHeaderView());
        },

   Then, in our `index` function - which handles hash change routing from the `AppRouter` as described above - we show a `WelcomeView` in the Application's `mainRegion`:

        index:function () {
            App.mainRegion.show(new WelcomeView());
        }


DesktopController.js
--------------------
   DesktopController.js is almost identical to MobileController, except that instead of showing a `MobileHeaderView` in the `headerRegion`, we rather predictably show a `DesktopHeaderView`.  Again, note that this parallel DesktopController/MobileController is just one way that an application could handle the differences between a mobile and desktop version of an application.  There are many, many other ways this could be done, so don't let this get in your way if it's not exactly what you're after.


WelcomeView.js
-----------
   WelcomeView.js will be used by both the mobile and desktop versions of your application.  It starts with a define method that lists all of its dependencies.

   The rest of the file is a simple implementation of Marionette.ItemView, which is itself a derivative of Backbone.View.  The [require-handlebars-plugin](https://github.com/SlexAxton/require-handlebars-plugin) (`hbs` for short) is used to load pre-compiled Handlebars views from the templates specified.  This is different than the more common strategy of using the RequireJS `text` plugin to load strings from template files, then compiling them with Handlebars or Underscore.  In the case of `WelcomeView`, we load the template function for our template `welcome.html`, and set it as the `template` attribute on our `WelcomeView` class.  

   Backbone.js Views have a one-to-one relationship with DOM elements, and a View's DOM element is listed in the `el` property, or is created as a simple `div` if none is specified.  The jQuery-wrapped DOM element is then available as `$el`.  The View's `model` is set to a new instance of Model.js, listed above as a dependency.  

   Marionette.ItemView is an extension of the base Backbone.View, but contains some basic logic for rendering and tearing down the view.  If a View's `template` attribute is set to a template function created by an engine like Handlebars or Underscore, ItemView's `render` method will automatically render the View's `$el` for you.  Of course you are also free to write your own simple `render` method.  Our `DesktopHeaderView` is a good example of the simplest of possible views:

```js
define(['jquery', 'hbs!template/desktopHeader', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template
        });
    });
```
   Here we use the `hbs` plugin to load desktopHeader.html in as a pre-compiled Handlebars template function.  If Handlebars isn't your thing and you prefer EJS-style Underscore templating, consider using [require-tpl](https://github.com/JulienCabanes/requirejs-tpl) to accomplish the same thing.  Pre-compiled templates are a big performance boost in production-built applications.

   Back to `WelcomeView.js` Next you will find an `events` object.  This is where all of your View DOM event handlers associated with the HTML element referenced by your View's `el` property should be stored.  Keep in mind that Backbone is using the jQuery `delegate` method, so it expects a selector that is within your View's `el` property.  I did not include any events by default, so you will have to fill those in yourself.  Below is an example of having an events object with one event handler that calls a View's `someMethod()` method when an element with a class name of _someElement_ is clicked.

```js
// View Event Handlers
events: {
   "click .someElement": "someMethod"
}
```

   Finally, we return the View class.

   **Note**: If you have read all of the documentation up until this point, you will most likely have already noticed that [lodash](https://github.com/lodash/lodash) is being used instead of Underscore.js.  Apart from having a bit better cross-browser performance and stability than Underscore.js, lodash also provides a custom build process.  Although I have provided a version of lodash that has all of the Underscore.js methods you would expect, you can download a custom build and swap that in.  Also, it doesn't hurt that Lodash creator, [John-David Dalton](https://twitter.com/jdalton), is an absolute performance and API consistency maniac =)

welcome.html
------------
 This file is a simple example of a Handlebars template.  Templates are a useful way for you to update your View (the DOM) if a Model attribute changes.  They are also useful when you have a lot of HTML and JavaScript that you need to fit together, and instead of concatenating HTML strings inside of your JavaScript, templates provide a cleaner solution.  Look at Handlebars' and Underscore's documentation to read more about the respective syntaxes of these handy templating solutions.

Handlebars helpers with require-handlebars-plug (hbs)
-------------------
   In addition to loading pre-compiled template functions, `hbs` also does a couple more interesting things for us.  

   First, any Handlebars helper methods you define in the `template\helpers` folder will automatically get loaded and will be available in your templates.  For instance:

yeller.js
------------
   This is an example of a (perfectly useless) Handlebars template method.  It takes a string as input, and appends a bunch of bangs.  

```js
define(['handlebars'], function ( Handlebars ){
  function yeller ( context, options ) {
    // Assume it's a string for simplicity.
    return context + "!!!!!!!!";
  }

  Handlebars.registerHelper( 'yeller', yeller );
  return yeller;
});
```

In our `welcome.html`, we see its usage:

```html
   <p>{{yeller "Marionette is great"}}</p>
```

i18n
--------

   hbs also provides support for i18n.  By defining a JSON mapping file in `en_us.json` (for example), we can define a set of labels and messages which can later be translated into other languages.  

en_us.json
------
```js
{
  "desktop" : "Desktop Computer",
  "mobile" : "Mobile Device"
}
```

   We can then reference these English phrases in our templates like this example from `welcome.html`: 

```html
   You are viewing this application on
        {{#if mobile}}
                <strong>{{$ mobile}}</strong>
        {{else}}
                <strong>{{$ desktop}}</strong>
        {{/if}}.
```


Model.js
--------
   Model.js is used by both the mobile and desktop versions of your application.  It starts with a define method that lists jquery and backbone as dependencies.

   The rest of the file is a pretty standard Backbone.js Model class.

   Like other Backbone.js classes, there is an `initialize()` method that acts as the Model's constructor function.  There is also a **defaults** object that allows you to set default Model properties if you wish.

   Finally, The Backbone.js `validate` method is provided for you.  This method is called any time an attribute of the model is set.  Keep in mind that all model attributes will be validated (once set), even if a different model attribute is being set/validated.  This does not make much sense to me, so if you prefer only the Model attributes that are currently being saved/set to be validated, then use the validateAll option provided by [Backbone.validateAll](https://github.com/gfranko/Backbone.validateAll).

   Finally, a new Model class is returned.

Collection.js
------------------
   Collection.js is used by both the mobile and desktop versions of your application.  It starts with a define method that lists jquery, backbone, and UserModel.js as dependencies.

   The rest of the file is a pretty standard Backbone.js Collection class that is used to store all of your Backbone Models.  The Collection model property is set to indicate that all Models that will be within this Collection class will be of type Model (the dependency that is passed into the file).

   Finally, a new Collection class is returned.

Gruntfile.js
------------
This file is ready made for you to have your entire project optimized using Grunt.js, the [Require.js Optimizer](https://github.com/jrburke/r.js/) and [almond.js](https://github.com/jrburke/almond).

Grunt.js is a JavaScript command line task runner that allows you to easily automate common development tasks such as code linting, minification, and unit testing.

> Running the Jasmine Tasks with Grunt has not been implemented yet.

Almond.js a lightweight AMD shim library created by [James Burke](https://github.com/jrburke), the creator of Require.js.  Almond is meant for small to medium sized projects that use one concatenated/minified JavaScript file.  If you don't need some of the advanced features that Require.js provides (lazy loading, etc) then Almond.js is great for performance.

Marionette-Require-Boilerplate sets you up to use Require.js in development and Almond.js in production.  By default, Marionette-Require-Boilerplate is in _development_ mode, so if you want to try out the production build, read the production instructions below.

**Production Build Instructions**

Navigate to the root directory of the Marionette-Require-Boilerplate folder and type **grunt** and wait a few seconds for the build to complete.

> If you are on a Windows machine, you will have to type `grunt.cmd`

Once the script has finished, you will see that both _DesktopInit.min.js_ and _MobileInit.min.js_, and the _mobile.min.css_ and _desktop.min.css_ files will be created/updated.

Next, update the `production` local variable inside of **index.html** to be **true**.

And that's it!  If you have any questions just create in an issue on Github.

> Note that when running optimized builds, you must define a separate build process for each i18n language supported.  


SpecRunner.html
---------------
   This file is the starting point to your Jasmine test suite.  It includes Require.js and points it to **testInit.js**

TestInit.js
-----------
   This file includes all of the Require.js configurations for your Jasmine unit tests.  This file will look very similar to the **MobileInit.js** and **DesktopInit.js** files, but will also include Jasmine and the jasmine-jquery plugin as dependencies.

   You will also notice a _specs_ array that will allow you to add as many specs files as your application needs (Specs folders are where your unit tests are).  The boilerplate only includes one specs js file by default, so only one specs item is added to the array.  Finally, once the specs file is included by the `require()` call, Jasmine is initialized

spec.js
-------
   This file contains all of your Jasmine unit tests.  Only seven tests are provided, with unit tests provided for Views, Models, Collections, and Routers (Mobile and Desktop).  I'd write more, but why spoil your fun?  Read through the tests and use them as examples to write your own.

   The entire file is wrapped in an AMD define method, with all external module (file) dependencies listed.  The Jasmine tests should be self explanatory (BDD tests are supposed to describe an app's functionality and make sense to non-techy folk as well), but if you have any questions, just file an issue and I'll respond as quickly as I can.


#FAQ

**What libraries have you included?**

   -Marionette, Backbone, Require, Lodash, Almond, jQuery, jQueryUI, jQuery Mobile, Twitter Bootstrap, and Handlebars

**What Require.js plugins are you using?**

   - The require-handlebars-plugin `hbs` plugin.  As described above, it provides an easy way to load pre-compiled templates as AMD modules from static html template files.  I was previously using the RequireJS text plugin to load template strings in to each View and compiling them there, but hbs allows me to load these templates pre-compiled, simplifying my code and improving performance.  It also brings support for Handlebars helper methods as well as i18n internationalization, as described before.


**Why are you using Grunt for the build?**

   - Grunt comes jam packed with features and plugins to help improve project automation tasks.  Although the main job of Grunt (within Backbone-Require-Boilerplate) is to run the Require.js optimizer, it is also for other tasks such as JSHinting your code.

**What Grunt plugins are you using?**

   - The boilerplate uses the **grunt-contrib-requirejs** plugin to run the Require.js optimizer and the **grunt-contrib-jshint** plugin to automate JSHint code quality checking.  Both plugins are maintained by the core Grunt team.

**What Grunt tasks can I use?**

   - The boilerplate provides `test`, `build`, and `default` tasks.

   - The `test` task will only JSHint your code for quality.  You can run the `test` task by typing `grunt test`.

   - The `build` task will concatenate and minify your Desktop/Mobile JavaScript and CSS files using the Require.js optimizer.  You can run the `build` task by typing `grunt build`.

   - The `default` task will run both the `test` and `build` tasks.  You can run the `default` task by typing `grunt`.
   

**Do I have to use everything the boilerplate gives me?**

   -No!  Feel free to update the boilerplate to fit the needs of your application.  Certain things that you might not want/need include templates, mobile and desktop versions, jQuery Mobile, etc.

**Do I need a web server to test the boilerplate?**

   -Yep, because the Require.js text plugin dynamically pulls in template files via ajax (which is not allowed with the `File://` local extension.  Luckily for you I have provided an easy to use Node.js web server for convenience.

**Can I contribute to this project?**

   -Please do!  I am learning just like you.  If you want to contribute, please send pull requests to the dev branch.



##Change Log

`0.3.0` - May 19, 2013

- Resolved circular dependency issue, added almond
- Added require-handlebars-plugin to load pre-compiled templates

`0.2.0` - May 15, 2013

- Updated project with changes from BRB 1.5.0 
- single `config.js` file
- Grunt build

`0.1.0` - January 21, 2013

- Cloned project based off of [Greg Franko](https://github.com/gfranko)'s [Backbone-Require-Boilerplate](https://github.com/gfranko/Backbone-Require-Boilerplate) project.  

- Added Marionette and Handlebars

##Contributors
[Brett Jones](https://github.com/brettjonesdev), [Greg Franko](https://github.com/gfranko), [Nick Pack](https://github.com/nickpack)

## License
Copyright (c) 2013 Brett Jones, Greg Franko  
Licensed under the MIT license.		


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/bitdeli/bd-toydata-widget-gallery/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
