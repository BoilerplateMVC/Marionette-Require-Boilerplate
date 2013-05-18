define(['jquery', 'backbone', 'underscore', 'handlebars'],
    function ($, Backbone, _, Handlebars) {
        var App = new Backbone.Marionette.Application();

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion:"header",
            mainRegion:"#main"
        });

        App.addInitializer(function (options) {
            this.mobile = options ? options.mobile : false;
            Backbone.history.start();
        });

        return App;
    });