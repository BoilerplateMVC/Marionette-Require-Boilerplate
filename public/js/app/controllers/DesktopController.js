define(['backbone','marionette', 'views/WelcomeView', 'views/NavView'], function(Backbone, Marionette, WelcomeView, NavView) {
   return Backbone.Marionette.Controller.extend({
       initialize: function(options) {
           App.navRegion.show( new NavView());
       },
       //gets mapped to in AppRouter
       index: function() {
           App.mainRegion.show(new WelcomeView());
       }
   }) ;
});