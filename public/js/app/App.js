define(['jquery', 'underscore', 'handlebars', 'config/Renderer'],
    function ($, _, Handlebars, Renderer) {
        //App is global variable for our instance of Backbone.Marionette.Application
        if (!window.App) {
            var App = new Backbone.Marionette.Application();

            //Organize Application into regions corresponding to DOM elements
            //Regions can contain views, Layouts, or subregions nested as necessary
            App.addRegions({
                headerRegion:"header",
                mainRegion:"#main"
            });

            App.addInitializer(function (options) {
                var dependencies;
                this.mobile = options ? options.mobile : false;
                if (this.mobile) {
                    dependencies = ["routers/AppRouter", "controllers/MobileController"];
                }
                else {
                    dependencies = ["routers/AppRouter", "controllers/DesktopController"];
                }
                //set AppRouter's controller to MobileController or DesktopController
                require(dependencies, function (AppRouter, Controller) {
                    App.appRouter = new AppRouter({
                        controller:new Controller()
                    });
                    Backbone.history.start();
                });
            });

        }
        //export App as global variable
        window.App = App;
    });