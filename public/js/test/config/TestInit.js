require(["jquery", "backbone", "marionette", "jasmine-html", "jquerymobile", "bootstrap", "backbone.validateAll"],
    function ($, Backbone, Marionette, jasmine) {
        specs = [];
        specs.push('../test/specs/spec');
        $(function () {
            require(specs, function () {
                jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
                jasmine.getEnv().execute();
            });
        });
    }

);