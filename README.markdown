Marionette-Require-Boilerplate (MRB)
==================================
![Example](http://sidnet.info/sites/default/files/marionette-logo.png) ![Example](http://backbonejs.org/docs/images/backbone.png) ![Example](http://requirejs.org/i/logo.png)

#Description
A Marionette.js, Backbone.js and Require.js Boilerplate that promotes decoupling your JavaScript into modules, separating business logic from application logic using Collections/Models, Regions and Views, reusing your JavaScript between Desktop and Mobile Web versions while using a mobile framework (jQuery Mobile), including non-AMD Compatible Third Party Scripts in your project, optimizing all of your JavaScript (minify, concatenate, etc), and unit testing your JavaScript.

#Getting Started
   1. Download and install [Node.js](http://nodejs.org/#download)
   2. Clone this repository
   3. On the command line, type `npm install nodemon -g` to install the [nodemon](https://github.com/remy/nodemon) library globally.  If it complains about user permissions type `sudo npm install nodemon -g`.
   3. On the command line, navigate to inside of the **Marionette-Require-Boilerplate** folder and type `npm install`
   4. Next, type `nodemon` (this will start your Node.js web server and restart the server any time you make a file change thanks to the wonderful  library)
   5. To view the demo page, go to `http://localhost:8001`
   6. To view the Jasmine test suite page, go to `http://localhost:8001/specRunner.html`
   7. Enjoy using Marionette, Backbone, Require, Lodash, jQuery, jQueryUI, jQuery Mobile, Twitter Bootstrap, and Handlebars (enjoyment optional)

#Tour of the Boilerplate Files

index.html
----------
   Uses a large portion of the [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) HTML and CSS.  You will notice there is a simple JavaScript mobile browser detection script to determine if a user is using a mobile or desktop browser.  The mobile detection script is within a **DOMContentLoaded** HTML5 JavaScript event handler (not supported in IE 6-8), which will trigger once the DOM is ready (the jQuery `ready()` event cannot be used because jQuery is loaded by Require.js and not yet included on the page).

   _Mobile Detection Script_

   If a mobile browser is found, then Require.js is included asynchronously within the HTML page, and the Require.js script tag HTML5 data attribute, `data-main`, is set to `js/app/config/MobileInit` (this tells Require.js to look for a MobileInit.js file inside of the config folder).  The jQuery Mobile CSS file is also included asynchronously.

   If a desktop device is found, then Require.js is included asynchronously within the HTML page, and the Require.js script tag HTML5 data attribute, `data-main`, is set to `js/app/config/DesktopInit` (this tells Require.js to look for a DesktopInit.js file inside of the config folder).

   **Note**:  You do not need to use the JavaScript mobile detection script for your application to use Backbone.js or Require.js. I just put it in so that you could see an example of how to separate your Mobile and Desktop JavaScript logic.

   _Loader Methods_

   You will notice that the CSS files and the Require.js file are being included on the page via the `loadCss()` and `loadRequireJS()` methods.  Require.js does not officially support [loading CSS files](http://requirejs.org/docs/faq-advanced.html#css), which is why I included the `loadCSS()` method to asynchronously include any CSS file.  Loading CSS asynchronously also allows me the flexibility/mechanism to load different CSS files if a user is on a mobile device.

   I included the `loadRequireJS` file, the Desktop and Mobile versions of the boilerplate point Require.js to two different files.  Including Require.js asynchronously within the `loadRequireJS` method allowed me the flexibility to do that. 

MobileInit.js
-------------
   MobileInit.js is only used if a mobile browser is detected.  This file includes your mobile Require.js configurations.

   If we look at the mobile Require.js configurations, we will see the first thing being configured are the paths.  Setting paths allow you to define an alias name and file path for any file that you like.

   Typically, you want to set a path for any file that will be listed as a dependency in more than one module (eq. jQuery, Marionette, Backbone).  This saves you some typing, since you just have to list the alias name, and not the entire file path, when listing dependencies.  After all of the file paths are set, you will find the Shim configuration (Added in Require.js 2.0).
   

   The Shim configuration allows you to easily include non-AMD compatible JavaScript files with Require.js (a separate library such as [Use.js](https://github.com/tbranyen/use.js/) was previously needed for this).  This is very important, because Backbone versions > 0.5.3 no longer support AMD (meaning you will get an error if you try to use both Require.js and the latest version of Backbone).  Marionette as well does not support AMD.  This configuration is a much better solution than manually editing non-AMD compatible JavaScript files to make sure the code is wrapped in a `define` method.  Require.js creator [James Burke](http://tagneto.blogspot.com/) previously maintained AMD compatible forks of both Backbone.js and Underscore.js because of this exact reason.

        shim:{
            // jQuery Mobile
            "jquerymobile":["jquery"],
            // Backbone
            "backbone":{
                // Depends on underscore/lodash and jQuery
                "deps":["underscore", "jquery"],
                // Exports the global window.Backbone object
                "exports":"Backbone"
            },
            //Marionette
            "marionette":{
                "deps":["underscore", "backbone", "jquery"],
                "exports":"Marionette"
            },
            //Handlebars
            "handlebars":{
                "exports":"Handlebars"
            },
            // Backbone.validateAll plugin that depends on Backbone
            "backbone.validateAll":["backbone"]
        }

   The Shim configuration also takes the place for the old Require.js `order` plugin.  Within the Shim configuration, you can list files and their dependency tree.  An example is jQuery plugins being dependent on jQuery:

         shim: {

            // Twitter Bootstrap plugins depend on jQuery
            "bootstrap": ["jquery"]

         }

   **Note**: You do not need a shim configuration for [jQuery](http://www.jquery.com) or [lodash](https://github.com/bestiejs/lodash) because they are both AMD compatible.

   After Require.js is configured, `require` is called.  The `require` method  asynchronously loads its dependencies, including `App.js`.  As we will discuss later, `App.js` actually exports a global variable, `App`.  

   After all of those files are loaded, two internal jQuery Mobile properties are turned off to allow Backbone/Marionette to handle all of the routing.

            // Prevents all anchor click handling
            $.mobile.linkBindingEnabled = false;

            // Disabling this will prevent jQuery Mobile from handling hash changes
            $.mobile.hashListeningEnabled = false;

   Then, `App.start( { mobile: true } )` is called, starting our Marionette application and initiating Route handling.

DesktopInit.js
--------------
   DesktopInit.js is only used if a desktop browser is detected.  This is where your desktop Require.js configurations will be.

   This file is the exact same as MobileInit.js, except it has a few different dependencies (Twitter Bootstrap instead of jQuery Mobile, etc)


App.js
------
   App.js is where we instantiate our globally accessible `Marionette.Application` object.  This file starts with a define method that lists Backbone and Marionette as dependencies. Keep in mind that Backbone and Marionette had already been previously loaded in MobileInit.js/DesktopInit.js, but Require.js is smart enough not to load dependencies more than once.

   It is best practice to list out all of your dependencies for every file, regardless of whether or not they expose global objects and are already included in the page.  This is also especially important for the Require.js optimizer (which needs to determine which files depend on which other files).  

   **Note**: If your dependencies do not expose global objects, then it is absolutely mandatory to list it as a dependency, since Require.js does not allow global variables (meaning your modules are private and cannot be accessed by other modules or code without explicitly listing them as dependencies).

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
           //"index" must be a method in AppRouter's controller
           appRoutes: {
               "home": "home"
           }, 
           controller: new Backbone.Marionette.Controller({
                home: function() {
                    //do something
                }
            })
        });

   Here we see that when a URL change event occurs and the URL hash matches `#home`, the `index` method in `AppRouter.controller` will be fired.  In our application, we implement a different Controller for Mobile than for Desktop.  This is just an optional way to handle differences between Mobile and Desktop versions of the application - the same routes will be handled by different controllers depending on the user's device.  There is currently only one appRoute listed in AppRouter.js (which gets called if there is no hash tag on the url), but feel free to create more for your application.

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

   The rest of the file is a simple implementation of Marionette.ItemView, which is itself a derivative of Backbone.View.  The RequireJS `text` plugin is used to load `welcome.html` as a string, which is set as the `template` attribute on our `WelcomeView` class.  

   Backbone.js View's have a one-to-one relationship with DOM elements, and a View's DOM element is listed in the `el` property, or is created as a simple `div` if none is specified.  The jQuery-wrapped DOM element is then available as `$el`.  The View's `model` is set to a new instance of Model.js, listed above as a dependency.  

   Marionette.ItemView is an extension of the base Backbone.View, but contains some basic logic for rendering and tearing down the view.  If a View's `template` attribute is set to a template function created by an engine like Handlebars or Underscore, ItemView's `render` method will automatically render the View's `$el` for you.  Of course you are also free to write your own simple `render` method.  Our `DesktopHeaderView` is a good example of the simplest of possible views:

define(['underscore', 'jquery', 'handlebars', 'text!templates/desktopHeader.html'],
    function (_, $, Handlebars, template) {
        return Backbone.Marionette.ItemView.extend({
            template:Handlebars.compile(template)
        });
    });

Here we use the `text` plugin to load desktopHeader.html in as a template string, and then compile it into a function with Handlebars.  There are handy plugins out there which condense this step for you.  For Handlebars, consider using the [require-handlebars-plugin](https://github.com/SlexAxton/require-handlebars-plugin).  For Underscore, consider [require-tpl](https://github.com/ZeeAgency/requirejs-tpl).

   Next you will find an `events` object.  This is where all of your View DOM event handlers associated with the HTML element referenced by your View's `el` property should be stored.  Keep in mind that Backbone is using the jQuery `delegate` method, so it expects a selector that is within your View's `el` property.  I did not include any events by default, so you will have to fill those in yourself.  Below is an example of having an events object with one event handler that calls a View's `someMethod()` method when an element with a class name of _someElement_ is clicked.

            // View Event Handlers
            events: {

               "click .someElement": "someMethod"

            },


   Finally, I am returning the View class.


   **Note**: If you have read all of the documentation up until this point, you will most likely have already noticed that [lodash](https://github.com/bestiejs/lodash) is being used instead of Underscore.js.  Apart from having a bit better cross-browser performance and stability than Underscore.js, lodash also provides a custom build process.  Although I have provided a version of lodash that has all of the Underscore.js methods you would expect, you can download a custom build and swap that in.  Also, it doesn't hurt that Lodash creator, [John-David Dalton](https://twitter.com/jdalton), is an absolute performance and API consistency maniac =)


welcome.html
------------
 This file includes a template that is included via the Require.js [text plugin](https://github.com/requirejs/text).  Templates are typically a useful way for you to update your View (the DOM) if a Model attribute changes.  They are also useful when you have a lot of HTML and JavaScript that you need to fit together, and instead of concatenating HTML strings inside of your JavaScript, templates provide a cleaner solution.  Look at Handlebars' and Underscore's documentation to read more about the respective syntax of these handy templating solutions.

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

app.build.js
------------
   This file is ready made for you to have your entire project optimized using Node.js, the [Require.js Optimizer](https://github.com/jrburke/r.js/) and (optionally) [almond.js](https://github.com/jrburke/almond).

   Almond.js a lightweight AMD shim library created by [James Burke](https://github.com/jrburke), the creator of Require.js.  Almond is meant for small to medium sized projects that use one concatenated/minified JavaScript file.  If you don't need some of the advanced features that Require.js provides (lazy loading, etc) then Almond.js is great for performance.  



**Note**: The Require.js optimizer works by **static* analysis - it looks at your main config file and then peeks in each specified dependency file, noting their dependencies as well until all dependencies have been discovered, and then concatenates them all into an optionally minified output file.  However, in App.js of our application, we **dynamically** load either MobileController.js or DesktopController.js.  That means that in the static analysis, these dependencies are not detected.  If we are using Almond.js, then our build output will error out saying these dependencies are not found, since Almond does not actually perform asynchronous script loading like the full Require.js does.  For this reason, in our project we will not be using Almond at this time.  To make sure that as many dependencies are combined into our build output as possible though, we explicitly add DesktopController and MobileController to our build configuration, like so:


        //Mobile build config
        include: ["app/config/MobileInit", "app/controllers/MobileController"]

        //Desktop build config
        include: ["app/config/DesktopInit", "app/controllers/DesktopController"]


   Marionette-Require-Boilerplate sets you up to use Require.js in both development and production, for the reason stated above.  I hope to find a way to use Almond.js with dynamically loaded dependencies and would welcome any contribution which makes this possible.  

   By default, Marionette-Require-Boilerplate is in _development_ mode, so if you want to try out the production build, read the production instructions below.

   **Production Build Instructions**

   Navigate to within the **deploy** folder and then type **node app.build.js** and wait a few seconds.  Once the script has finished, you will see that both _DesktopInit.min.js_ and _MobileInit.min.js_ will be updated.

   Next, update the `loadRequireJS` method calls inside of **index.html** to now point to your minified desktop and mobile init files instead of the non-minified versions.  Look at the index.html file in this [gist](https://gist.github.com/3752005) for the correct _production_ setup.

   And that's it!  If you have any questions just create in an issue on Github.

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

   -Just the Require.js text plugin, since it provides an easy way to keep templates in their own folders (instead of just embedding them in your html files).  I was previously using Use.js to load non-AMD compatible scripts, but Require.js 2.0 now provides this functionality.

**Why are you not using the Require.js Internationalization plugin?**

   -I found that when I built using the Require.js Optimizer, only one lang-locale could be included per optimized file.  That would mean, that if you had to support 10 different langs/locales, you would need 20 different optimized builds (Desktop and Mobile).  If I am mistaken about this, please let me know, and I will update the Boilerplate with the Internationalization plugin.  A solution for including localized text is in the roadmap and will be included in a future release of the project.

**You're not using Grunt for your build process?  Are you some sort of newb?**

   -No, but I am still debating whether or not I will include Grunt for this project.

**Do I have to use everything the boilerplate gives me?**

   -No!  Feel free to update the boilerplate to fit the needs of your application.  Certain things that you might not want/need include templates, mobile and desktop versions, jQuery Mobile, etc.

**Do I need a web server to test the boilerplate?**

   -Yep, because the Require.js text plugin dynamically pulls in template files via ajax (which is not allowed with the `File://` local extension.  Luckily for you I have provided an easy to use Node.js web server for convenience.

**Can I contribute to this project?**

   -Please do!  I am learning just like you.  If you want to contribute, please send pull requests to the dev branch.



##Change Log

`0.1.0` - January 21, 2012

Cloned project based off of [Greg Franko](https://github.com/gfranko)'s [Backbone-Require-Boilerplate](https://github.com/gfranko/Backbone-Require-Boilerplate) project.  

Added Marionette and Handlebars

##Contributors
Brett Jones, Greg Franko

## License
Copyright (c) 2012 Brett Jones, Greg Franko  
Licensed under the MIT license.		


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/bitdeli/bd-toydata-widget-gallery/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
