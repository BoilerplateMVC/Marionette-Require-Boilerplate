require.config({
    baseUrl:"./js/app",

    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"../libs/jquery",
        "jquerymobile":"../libs/jquery.mobile",
        "underscore":"../libs/lodash",
        "backbone":"../libs/backbone",
        "marionette":"../libs/backbone.marionette",
        "handlebars":"../libs/handlebars",

        // Plugins
        "backbone.validateAll":"../libs/plugins/Backbone.validateAll",
        "text":"../libs/plugins/text",

        //Mobile specific dependencies
        "AppController":"controllers/MobileController"
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
require(["App", "jquery", "backbone", "marionette", "jquerymobile", "backbone.validateAll"],
    function (App, $) {
        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;
        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        // Start Marionette Application in mobile mode
        App.start({mobile:true});
    });