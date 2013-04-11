module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            mobileJS: {
                options: {
                    baseUrl: "public/js/",
                    paths: {
                        "mobile": "app/config/MobileInit",
                        "mobileController": "app/controllers/MobileController"
                    },
                    wrap: true,
                    // Cannot use almond since DesktopController/MobileController are loaded dynamically, and static analysis will fail to detect this
                    // must include MobileController manuall
                    // name: "libs/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    optimizeCss: "standard",
                    mainConfigFile: "public/js/app/config/MobileInit.js",
                    include: ["mobile", "mobileController"],
                    out: "public/js/app/config/MobileInit.min.js"
                }
            },
            mobileCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./public/css/mobile.css",
                    out: "./public/css/mobile.min.css"
                }
            },
            desktopJS: {
                options: {
                    baseUrl: "public/js/",
                    paths: {
                        "desktop": "app/config/DesktopInit",
                        "desktopController": "app/controllers/DesktopController"
                    },
                    wrap: true,
                    // Cannot use almond since DesktopController/MobileController are loaded dynamically, and static analysis will fail to detect this
                    // must include MobileController manuall
                    // name: "libs/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    mainConfigFile: "public/js/app/config/DesktopInit.js",
                    include: ["desktop", "desktopController"],
                    out: "public/js/app/config/DesktopInit.min.js"
                }
            },
            desktopCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./public/css/desktop.css",
                    out: "./public/css/desktop.min.css"
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['requirejs:desktopJS', 'requirejs:mobileJS', 'requirejs:desktopCSS', 'requirejs:mobileCSS']);
    grunt.registerTask('default', ['test', 'build']);
};