define( ['App', 'backbone', 'marionette', 'underscore', 'jquery', 'handlebars', 'models/Model', 'text!templates/welcome.html'],
    function(App, Backbone, Marionette, _, $, Handlebars, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            //Template HTML string
            template: Handlebars.compile(template),
            model: new Model({
                mobile: App.mobile
            }),

            // View Event Handlers
            events: {

            }
        });
    });