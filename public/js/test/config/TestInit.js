require.config({
    baseUrl:"./js",
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"libs/jquery",
        "jqueryui":"libs/jqueryui",
        "jquerymobile":"libs/jquery.mobile",
        "underscore":"libs/lodash",
        "backbone":"libs/backbone",
        "marionette":"libs/backbone.marionette",
        "handlebars":"libs/handlebars",
        "jasmine": "libs/jasmine",
        "jasmine-html": "libs/jasmine-html",

        // Plugins
        "backbone.validateAll":"libs/plugins/Backbone.validateAll",
        "bootstrap":"libs/plugins/bootstrap",
        "text":"libs/plugins/text",
        "jasminejquery": "libs/plugins/jasmine-jquery",

        // Application Folders
        "collections":"app/collections",
        "models":"app/models",
        "routers":"app/routers",
        "templates":"app/templates",
        "config":"app/config",
        "controllers":"app/controllers",
        "views":"app/views"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim:{
        // Twitter Bootstrap jQuery plugins
        "bootstrap":["jquery"],
        // jQueryUI
        "jqueryui":["jquery"],
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
        "backbone.validateAll":["backbone"],

        // Jasmine Unit Testing
        "jasmine": {

            // Exports the global 'window.jasmine' object
            "exports": "jasmine"

        },

        // Jasmine Unit Testing helper
        "jasmine-html": {
            "deps": ["jasmine"],
            "exports": "jasmine"
        }
    }
});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["jquery", "backbone", "marionette", "jasmine-html", "jquerymobile", "bootstrap", "backbone.validateAll"],

  function($, Backbone, Marionette, jasmine) {

    specs = [];
 
    specs.push('test/specs/spec');
 
 
    $(function() {
    
      require(specs, function() {

        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());

        jasmine.getEnv().execute();

    
      });

    });

  }

);