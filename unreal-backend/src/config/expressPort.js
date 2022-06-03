import winston from './winston';
import chalk from 'chalk';

// Normalize a port into a number, string, or false.
export const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};


/**
 * Event listener for HTTP server "error" event.
 */

export const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof global.port === 'string' ?
        `Pipe ${global.port}` :
        `Port ${global.port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */

export const onListening = () => {
    const addr = global.server.address();
    const bind = typeof addr === 'string' ?
        `pipe ${addr}` :
        `port ${addr.port}`;
    winston.info(chalk.bold.green('Server is listening on', bind));
};
