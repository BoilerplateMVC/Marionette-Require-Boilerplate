define(['backbone', 'marionette', 'underscore', 'handlebars'],
    function (Backbone, Marionette, _, Handlebars) {
        Marionette.Renderer.render = function (template, data, view) {
            var templateFunc;
            if ( !view ) view = { _engine: 'Handlebars' };
            if (typeof template === 'function') {
                templateFunc = template;
            } else if (typeof template === 'string') {
                if (view._engine === 'underscore') {
                    templateFunc = _.template(template);
                } else {
                    templateFunc = Handlebars.compile(template);
                }
                // cache the templateFunc on the view to prevent recompilation next time
                view.template = templateFunc;
                view.options.template = templateFunc
            }

            var html = templateFunc(data);
            return html;
        };
    });