define(['backbone','marionette', 'views/WelcomeView'], function(Backbone, Marionette, WelcomeView) {
    return Backbone.Marionette.Controller.extend({
        initialize: function(options) {
            //do something different here for Mobile
        },
        //gets mapped to in AppRouter
        index: function() {
            App.mainRegion.show(new WelcomeView());
        }
    }) ;
});