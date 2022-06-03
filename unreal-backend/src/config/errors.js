import glob from 'glob';
import _ from 'lodash';
import fs from 'fs';
import winston from './winston';
import path from 'path'

winston.info('error messages are loading ...');
let routePath = path.join(__dirname, '..', 'app/modules/**/*.errors.json');

// let routePath = 'app/modules/**/*.errors.json';
// initialising with common error message objects
export const errorObject = {
    1: {
        'msg': {
            'EN': 'User does not exist.'
        }
    },
    2: {
        'msg': {
            'EN': 'Incorrect password.'
        }
    },
    3: {
        'msg': {
            'EN': 'User is not authenticated.'
        }
    },
    4: {
        'msg': {
            'EN': 'User is not authorized to visit the api.'
        }
    },
    5: {
        'msg': {
            'EN': 'Only JPEG, JPG, PNG format images allowed.'
        }
    },
    10: {
        'msg': {
            'EN': 'Street Address is required.'
        }
    },
    11: {
        'msg': {
            'EN': 'Postal Code is required.'
        }
    },
    12: {
        'msg': {
            'EN': 'City is required.'
        }
    },
    13: {
        'msg': {
            'EN': 'State is required.'
        }
    },
    14: {
        'msg': {
            'EN': 'Country is required.'
        }
    },
};

glob.sync(routePath).forEach(file => {
    _.extend(errorObject, JSON.parse(fs.readFileSync(file, 'utf-8')));
    winston.info(`${file} is loaded`);
});
export default errorObject