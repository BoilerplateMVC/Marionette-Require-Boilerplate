// Include Mobile Specific JavaScript files here (or inside of your Mobile Controller, or differentiate based off App.mobile === true)
require(["App", "jquery", "backbone", "marionette", "jquerymobile", "backbone.validateAll"],
    function (App, $) {
        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;
        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        // Start Marionette Application in mobile mode
        App.start({mobile:true});
    });