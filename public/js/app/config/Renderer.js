define(['backbone', 'marionette', 'underscore', 'handlebars'],
    function (Backbone, Marionette, _, Handlebars) {
        Marionette.Renderer.render = function (template, data) {
            var templateFunc;
            // Marionette.Renderer.render() gets called from within a view
            var view = this;
            if (typeof template === 'function') {
                templateFunc = template;
            } else if (typeof template === 'string') {
                if (view._engine === 'Handlebars') {
                    templateFunc = Handlebars.compile(template);
                } else {
                    templateFunc = _.template(template);
                }
            }
            // if view has a template attr, cache the templateFunc there to prevent recompilation next time
            if (view.template) {
                view.template = templateFunc;
            }
            var html = templateFunc(data);
            return html;
        };
    });