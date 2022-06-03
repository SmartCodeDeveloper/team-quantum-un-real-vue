import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import http from 'http';
import morganMiddleware from './morgan';
import winston from './winston';

const app = express();
import * as expressPort from './expressPort';
import { routes } from "./routes";


// Setup Request Info Logging in Console with Morgan
app.use(morganMiddleware.morganChalk);

// parse application/json
app.use(express.json({ limit: '4mb' }));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./config')((err) => {
    if (err) {
        winston.error(err);
    } else {
        // Create HTTP server.
        global.server = http.createServer(app);

        /**
         * Get port from environment and store in Express.
         */

        global.port = expressPort.normalizePort(config.PORT || '3000');

        global.server.listen(global.port, '0.0.0.0');
        global.server.on('error', expressPort.onError);
        global.server.on('listening', expressPort.onListening);

        // CORS middleware
        let corsOptionsDelegate = (req, callback) => {
            let corsOptions;
            let allowedOrigins = [
                'http://localhost:3000',
                'http://localhost:4200',
                'http://localhost:8080',
            ];
            if (allowedOrigins.includes(req.header('Origin'))) {
                corsOptions = {
                    credentials: true,
                    origin: true
                };
            } else {
                corsOptions = {
                    origin: false
                };
            }
            callback(null, corsOptions);
        };
        app.use(cors(corsOptionsDelegate));
        app.use(helmet());
        app.use(cookieParser());

        global.errors = require('./errors');
        routes(app);

        app.get('/', (req, res, next) => {
            res.json({
                status: 1,
                message: 'server is up and running.',
                data: {}
            });
        });

        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers
        let errorHandler = require('./errorHandler');
        app.use(errorHandler.allErrorHandler);
 
    }
});


export default app