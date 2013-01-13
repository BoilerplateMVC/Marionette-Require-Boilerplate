// global variable
var App = null;
define(['jquery','underscore', 'handlebars', 'config/Renderer'],
    function ($, _, Handlebars) {
        //App is global variable for our instance of Backbone.Marionette.Application
        if (App === null) {
            var App = new Backbone.Marionette.Application();

            App.addRegions( {
                navRegion: "header",
                mainRegion: "#main"
            });

            App.addInitializer(function(options){
                var dependencies;
                this.mobile = options.mobile;
                if ( options.mobile ) {
                    dependencies = ["routers/AppRouter", "controllers/MobileController"];
                }
                else {
                    dependencies = ["routers/AppRouter", "routers/DesktopController"];
                }
                //set AppRouter's controller to MobileController or DesktopController
                require( dependencies, function( AppRouter, Controller ) {
                    App.appRouter = new AppRouter({
                        controller: new Controller()
                    });
                });
            });
        }

        return App;
    });