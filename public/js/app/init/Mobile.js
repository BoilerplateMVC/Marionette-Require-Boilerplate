// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
define(["App", "jquery", "routers/AppRouter", "AppController", "backbone", "marionette", "jquerymobile", "backbone.validateAll"],
    function (App, $, AppRouter, AppController) {
        return {
            start:function() {
                // Prevents all anchor click handling
                $.mobile.linkBindingEnabled = false;
                // Disabling this will prevent jQuery Mobile from handling hash changes
                $.mobile.hashListeningEnabled = false;

                App.appRouter = new AppRouter({
                    controller:new AppController()
                });

                App.start();
            }
        };
    });