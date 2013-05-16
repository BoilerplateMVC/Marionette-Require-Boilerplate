// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
require(["App", "jquery", "backbone", "marionette", "jqueryui", "bootstrap", "backbone.validateAll"],
    function (App) {
        // Start Marionette Application in desktop mode (default)
        App.start();
    });