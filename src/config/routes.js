import glob from 'glob';
import winston from './winston';
import path from 'path';

export const routes = (app) => {
    winston.info('routes are loading ...');
    let routePath = path.join(__dirname, '..', 'app/modules/**/*.routes.js');
    let version = '/api/v1';
    glob.sync(routePath).forEach(file => {
        const { routes } = require(`${file}`);
        routes(app, version);
        winston.info(`${file} is loaded`);
    });
};
