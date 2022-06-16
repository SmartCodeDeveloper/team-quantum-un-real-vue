import errors from './errors';
import winston from './winston';

export const successResponse = (res, data, statusCode = 200) => {
    data.response = 200;
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'quality' || process.env.NODE_ENV === 'staging') {
        // winston.info(JSON.stringify(data.data));
    }
    res.status(statusCode).json(data);
};

export const errorResponse = (res, err,) => {
    if (err.name == 'ValidationError') {
         res.status(400).json({
            success: 0,
            message: err.errors,
            response: 400,
            data: {}
        });
    } else{
    res.json({
        success: 0,
        data: {},
        message: err,
        response: err.Code
    });
}
};

export const errorResponseWithData = (req, res, { msgCode }, data) => {
    res.json({
        success: 0,
        message: errors[msgCode].msg.EN,
        response: 400,
        data
    });
};

