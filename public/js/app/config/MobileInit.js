require.config({
    baseUrl:"./js",

    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"libs/jquery",
        "jquerymobile":"libs/jquery.mobile",
        "underscore":"libs/lodash",
        "backbone":"libs/backbone",
        "marionette":"libs/backbone.marionette",
        "handlebars":"libs/handlebars",

        // Plugins
        "backbone.validateAll":"libs/plugins/Backbone.validateAll",
        "text":"libs/plugins/text",

        // Application Folders
        "collections":"app/collections",
        "models":"app/models",
        "routers":"app/routers",
        "templates":"app/templates",
        "config":"app/config",
        "controllers":"app/controllers",
        "views":"app/views"
    },
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
});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["jquery", "backbone", "marionette", "app/App", "jquerymobile", "backbone.validateAll"],
    function ($) {
        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;
        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        // Start Marionette Application in mobile mode
        App.start({mobile:true});
    });