define(['underscore', 'jquery', 'handlebars', 'text!templates/mobileHeader.html'],
    function (_, $, Handlebars, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: Handlebars.compile(template),

            initialize: function() {
                this.on("render", function() {
                    //After template is rendered, turn into a jQuery mobile navbar
                    this.$el.navbar();
                }, this );
            }
        });
    });