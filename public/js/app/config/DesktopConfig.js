require.config({
    baseUrl:"./js/app",
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"../libs/jquery",
        "jqueryui":"../libs/jqueryui",
        "underscore":"../libs/lodash",
        "backbone":"../libs/backbone",
        "marionette":"../libs/backbone.marionette",
        "handlebars":"../libs/handlebars",

        // Plugins
        "backbone.validateAll":"../libs/plugins/Backbone.validateAll",
        "bootstrap":"../libs/plugins/bootstrap",
        "text":"../libs/plugins/text",

        //Desktop specific dependencies
        "AppController":"controllers/DesktopController"
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
        "backbone.validateAll":["backbone"]
    }
});

// Includes Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["App", "jquery", "backbone", "marionette", "jqueryui", "bootstrap", "backbone.validateAll"],
    function (App) {
        // Start Marionette Application in desktop mode (default)
        App.start();
    });