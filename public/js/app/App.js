define(['jquery', 'underscore', 'handlebars', 'routers/AppRouter'],
    function ($, _, Handlebars, AppRouter) {
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
                    dependencies = ["controllers/MobileController"];
                }
                else {
                    dependencies = ["controllers/DesktopController"];
                }
                //set AppRouter's controller to MobileController or DesktopController
                require(dependencies, function (Controller) {
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