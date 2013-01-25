define( ['underscore', 'jquery', 'handlebars', 'models/Model', 'text!templates/welcome.html'],
    function(_, $, Handlebars, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            //Template HTML string
            template: Handlebars.compile(template),
            model: new Model(),

            // View Event Handlers
            events: {

            }
        });
    });