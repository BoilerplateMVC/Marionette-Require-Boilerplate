// Include Mobile Specific JavaScript files here (or inside of your Mobile Controller, or differentiate based off App.mobile === true)
require(["App", "routers/AppRouter", "AppController", "jquery", "backbone", "marionette", "jquerymobile", "backbone.validateAll"],
    function (App, $) {
        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;
        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        App.appRouter = new AppRouter({
            controller:new AppController()
        });

        // Start Marionette Application in mobile mode
        App.start({mobile:true});
    });