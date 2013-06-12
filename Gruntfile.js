module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            mobileJS: {
                options: {
                    baseUrl: "public/js/app",
                    wrap: true,
                    // Don't use almond if your project needs to load modules dynamically
                    name: "../libs/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    optimizeCss: "standard",
                    mainConfigFile: "public/js/app/config/config.js",
                    include: ["init/MobileInit"],
                    out: "public/js/app/init/MobileInit.min.js",

                    /*********
                     * https://github.com/SlexAxton/require-handlebars-plugin
                     */
                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser : true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true
                    },

                    locale: "en_us",

                    // options object which is passed to Handlebars compiler
                    hbs : {
                        templateExtension: "html",
                        helperDirectory: "templates/helpers/",
                        i18nDirectory: "templates/i18n/",

                        compileOptions: {}
                    }
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
                    baseUrl: "public/js/app",
                    wrap: true,
                    // Cannot use almond since it does not currently appear to support requireJS's config-map
                    name: "../libs/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    mainConfigFile: "public/js/app/config/config.js",
                    include: ["init/DesktopInit"],
                    out: "public/js/app/init/DesktopInit.min.js"
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
