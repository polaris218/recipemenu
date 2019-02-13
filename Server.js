"use strict";

const constants = require('./constants');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const webpackMiddleware = require('./middlewares/webpack.middleware');

let Server = class {
    constructor(middleware, wrapper, db_layer) {
        this.middleware = middleware;
        this.app = middleware();
        this.router = wrapper.router;
        this.routes = wrapper.routes;
        this.db = db_layer;
        this.init();
    }

    init() {
        this.initMiddlewares();
        this.initHeaders();
        this.initRoutes();
    }

    initMiddlewares() {
        // Webpack hot reload
        //
        // TODO: Only enable hot reload for dev env
        //
        webpackMiddleware(this.app);

        // Other Helpers/Middlewares
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        this.app.use(logger('dev'));
        this.app.use(cookieParser());
        this.app.use(this.middleware.static(path.join(__dirname, 'public')));
    }

    initHeaders() {
        // Setup headers
        this.app.all('/*', (req, res, next) => {
            // CORS
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

            // Custom Headers
            res.header('X-XSS-Protection', '1; mode=block');
            res.header('X-Content-Type-Options', 'nosniff');
            res.header('X-Frame-Options', 'deny');
            res.header('Access-Control-Allow-Headers', 'Content-type,Cache-Control,Accept,X-Access-Token,X-Key');

            if (req.method === 'OPTIONS') {
                res.status(200).end();
            } else {
                next();
            }
        });
    }

    initRoutes() {
        // Setup index
        this.router.get('/', (req, res, next) => {
            res.send('Invalid path');
        });

        // Setup Routes
        this.app.use('/api', this.router);
        this.app.use('*', this.router);

        // Handle Errors
        this.app.use((req, res, next) => {
            let err = new Error('Not found');
            next(err);
        });

        this.app.listen(constants.APP_PORT, function() {
          console.log(`Listening on port ${constants.APP_PORT}...`)
        });
    }
};

module.exports = Server;