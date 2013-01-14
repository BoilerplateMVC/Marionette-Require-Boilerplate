define(['backbone', 'marionette', 'views/WelcomeView', 'views/MobileHeaderView'], function (Backbone, Marionette, WelcomeView, MobileHeaderView) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.headerRegion.show(new MobileHeaderView());
        },
        //gets mapped to in AppRouter
        index:function () {
            App.mainRegion.show(new WelcomeView());
        }
    });
});