// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
define(["App", "routers/AppRouter", "AppController", "jquery", "backbone", "marionette", "jqueryui", "bootstrap", "backbone.validateAll"],
    function (App, AppRouter, AppController) {
        return {
            start: function() {
                App.appRouter = new AppRouter({
                    controller:new AppController()
                });
                // Start Marionette Application in desktop mode (default)
                App.start();
            }
        };
    });