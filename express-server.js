// DEPENDENCIES
// ============
var express = require("express");
var exphbs = require('express3-handlebars');
var http = require("http");

var host = 'localhost';
var port = 8001;

var app = module.exports = express();

app.configure(function () {
    app.use(express["static"](__dirname + "/public"));

    app.use(express.errorHandler({
        dumpExceptions:true,
        showStack:true
    }));

    app.engine('handlebars', exphbs({}));
    app.set('view engine', 'handlebars');

    app.use(express.bodyParser());
    app.use(express.methodOverride());

    //must go last
    app.use(app.router);
});


var environment = process.env.MRB_ENV;
var production = false;
if (environment === 'prod') {
    production = true;
}

app.get('/', function(req, res){
    var isMobile = false;
    production = true;

    var filesToLoad;
    if (isMobile) {
        if (production) {
            filesToLoad = {
                css: "css/mobile.min.css",
                init: "js/app/init/MobileInit.min.js",
                production: true
            };
        } else {
            filesToLoad = {
                css: "css/mobile.css",
                init: "js/app/init/MobileInit.js",
                js: {
                    "data-main": "js/app/config/config.js",
                    "src": "js/libs/require.js"
                },
                production: false
            };
        }
    } else {
        if (production) {
            filesToLoad = {
                css: "css/desktop.min.css",
                init: "js/app/init/DesktopInit.min.js",
                production: true
            };
        } else {
            filesToLoad = {
                css: "css/desktop.css",
                init: "js/app/init/DesktopInit.js",
                js: {
                    "data-main": "js/app/config/config.js",
                    "src": "js/libs/require.js"
                },
                production: false

            };
        }
    }

    console.log('filesToLoad', filesToLoad);

    res.render('index', filesToLoad);
});

// Start Node.js Server
http.createServer(app).listen(port, host);

console.log('server started on ' + host + ':' + port);
