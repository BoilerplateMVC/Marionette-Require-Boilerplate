require.config({
    baseUrl:"./js/app",
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"../libs/jquery",
        "jqueryui":"../libs/jqueryui",
        "jquerymobile":"../libs/jquery.mobile",
        "underscore":"../libs/lodash",
        "backbone":"../libs/backbone",
        "marionette":"../libs/backbone.marionette",
        "handlebars":"../libs/handlebars",
        "hbs":"../libs/hbs",
        "i18nprecompile":"../libs/i18nprecompile",
        "json2":"../libs/json2",
        "jasmine": "../libs/jasmine",
        "jasmine-html": "../libs/jasmine-html",

        // Plugins
        "backbone.validateAll":"../libs/plugins/Backbone.validateAll",
        "bootstrap":"../libs/plugins/bootstrap",
        "text":"../libs/plugins/text",
        "jasminejquery": "../libs/plugins/jasmine-jquery"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim:{
        // Twitter Bootstrap jQuery plugins
        "bootstrap":["jquery"],
        // jQueryUI
        "jqueryui":["jquery"],
        // jQuery mobile
        "jquerymobile":["jqueryui"],

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

        "jasmine": {
            // Exports the global 'window.jasmine' object
            "exports": "jasmine"
        },

        "jasmine-html": {
            "deps": ["jasmine"],
            "exports": "jasmine"
        }
    },
    // hbs config
    hbs: {
        disableI18n: false,        // This disables the i18n helper and
        // doesn't require the json i18n files (e.g. en_us.json)
        // (false by default)

        disableHelpers: false,     // When true, won't look for and try to automatically load
        // helpers (false by default)

        /*
         helperPathCallback:       // Callback to determine the path to look for helpers
         function (name) {       // ('/template/helpers/'+name by default)
         return 'cs!' + name;
         },
         */

        templateExtension: "html", // Set the extension automatically appended to templates
        // ('hbs' by default)

        compileOptions: {}        // options object which is passed to Handlebars compiler
    }
});