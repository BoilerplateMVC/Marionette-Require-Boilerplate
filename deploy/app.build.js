// Node.js - Require.js Build Script

// To run the build type the following: node app.build.js

// Loads the Require.js Optimizer
var requirejs = require('../public/js/libs/r.js');

// Sets up the basic configuration
var baseConfig = {
  // All modules are located relative to this path
  baseUrl: "../public/js/",

  // Wraps all scripts in an IIFE (Immediately Invoked Function Expression)
  // (function() { + content + }());
  wrap: true,

  //Can optionally use almond.js (AMD shim) instead of the larger Require.js
  //however this prevents dynamically loaded dependencies from working - using Require.js
  //gives option to optimize multiple files into a single one, but then dynamically load later
  //name: "libs/almond",

  // Removes third-party license comments
  preserveLicenseComments: false,

  // Uses uglify.js for minification
  optimize: "uglify"
 };

// Creates an array of build configs, the baseConfig will
// be mixed into both the mobile and desktop builds below.
var configs = [
    {
        // Tells Require.js to look at mobileInit.js for all mobile shim and path configurations
        mainConfigFile: "../public/js/app/config/MobileInit.js",
        // Loads MobileInit.js and MobileController.js - must add MobileController here since it does not get detected
        // by r.js static analysis - is loaded dynamically in App.js
        include: ["app/config/MobileInit", "app/controllers/MobileController"],
        // The optimized mobile build file will put into the app directory
        out: "../public/js/app/config/Mobile-build.min.js"
    },
    {
        // Tells Require.js to look at desktopInit.js for all desktop shim and path configurations
        mainConfigFile: "../public/js/app/config/DesktopInit.js",
        // Loads DesktopInit.js and DesktopController.js - must add DesktopController here since it does not get
        // detected by r.js static analysis - is loaded dynamically in App.js
        include: ["app/config/DesktopInit", "app/controllers/DesktopController"],
        // The optimized desktop build file will put within the app directory
        out: "../public/js/app/config/Desktop-build.min.js"
    }
];

// Function used to mix in baseConfig to a new config target
function mix(target) {
    for (var prop in baseConfig) {
        if (baseConfig.hasOwnProperty(prop)) {
            target[prop] = baseConfig[prop];
        }
    }
    return target;
}

//Create a runner that will run a separate build for each item
//in the configs array. Thanks to @jwhitley for this cleverness
var runner = configs.reduceRight(function(prev, currentConfig) {
  return function (buildReportText) {
    requirejs.optimize(mix(currentConfig), prev);
  };
},
  function(buildReportText) {
    console.log(buildReportText);
});

console.log("Building... this might take a few seconds");

//Run the builds
runner();