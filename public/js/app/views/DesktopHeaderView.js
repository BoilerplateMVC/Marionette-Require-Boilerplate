define(['jquery', 'handlebars', 'text!templates/desktopHeader.html', 'backbone', 'marionette'],
    function ($, Handlebars, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:Handlebars.compile(template)
        });
    });