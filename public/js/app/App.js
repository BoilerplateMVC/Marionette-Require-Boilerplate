define(['jquery', 'backbone', 'underscore', 'handlebars', 'routers/AppRouter'],
    function ($, Backbone, _, Handlebars, AppRouter) {
        var App = new Backbone.Marionette.Application();

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion:"header",
            mainRegion:"#main"
        });

        App.addInitializer(function (options) {
            this.mobile = options ? options.mobile : false;

            //load AppController asynchronously, since it requires App.js
            require( ["AppController"], function(AppController) {
                App.appRouter = new AppRouter({
                    controller:new AppController()
                });
                Backbone.history.start();
            });
        });

        return App;
    });