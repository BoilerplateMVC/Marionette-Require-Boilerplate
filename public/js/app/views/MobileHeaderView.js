define(['underscore', 'jquery', 'jquerymobile', 'handlebars', 'text!templates/mobileHeader.html'],
    function (_, $, jqm,  Handlebars, template) {
        return Backbone.Marionette.ItemView.extend({
            template: Handlebars.compile(template),

            initialize: function() {
                _.bindAll(this);
            },
            onRender: function() {
                this.$el.navbar();
            }
        });
    });