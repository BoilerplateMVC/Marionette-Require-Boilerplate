define(['underscore', 'jquery', 'handlebars', 'text!templates/mobileHeader.html'],
    function (_, $, Handlebars, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,

            render: function() {
                this.$el.html( Backbone.Marionette.Renderer.render( this.template, {} )).navbar();
            }
        });
    });