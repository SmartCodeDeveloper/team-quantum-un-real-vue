import morgan from 'morgan';
import chalk from 'chalk';

// Setup Console Logging
morgan.token('remote-user', ({user}, res) => {
    if (user) {
        if (user.userType === 'user') {
            return `{userId: ${user._id} &name: ${user.name}}`;
        } else if (user.userType === 'driver') {
            return `{driverId: ${user._id} &name: ${user.name}}`;
        } else if (user.userType === 'Admin' || user.userType === 'SubAdmin') {
            return `{adminId: ${user._id} &name: ${user.name}}`;
        }
    } else {
        return 'Guest';
    }
});

// app.use(logger(':date[iso] :clientIP :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
const morganChalk = morgan((tokens, req, res) => [
    chalk.green.bold(tokens.date(req, res, 'iso')),
    chalk.blue.bold(tokens['remote-addr'](req, res)),
    chalk.yellow.bold(tokens['remote-user'](req, res)),
    chalk.green.bold(tokens.method(req, res)),
    chalk.blue.bold(tokens.url(req, res)),
    chalk.red.bold(tokens.status(req, res)),
    chalk.blue.bold(tokens.res(req, res, 'content-length')),
    chalk.yellow.bold(`${tokens['response-time'](req, res)} ms`),
].join(' '));

export default {
    morganChalk
};