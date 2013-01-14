define(["jquery", "models/Model", "views/NavView", "views/WelcomeView", "collections/Collection"],
    function($, Model, NavView, WelcomeView, Collection) {
        var DesktopRouter = Backbone.Router.extend({
            initialize: function() {
                App.headerRegion.show(new NavView());

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();
            },
            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash on the url, the home method is called
                "": "index"
            },
            index: function() {
                // Instantiates a new welcome view in the mainRegion
                App.mainRegion.show(new WelcomeView());
            }
        });
        return DesktopRouter;
    });