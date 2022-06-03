import winston from "./winston";

export const allErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  winston.error(JSON.stringify(err));
  if (err.message && typeof err.message === "number") {
    err.msgCode = err.message;
  }
  if (err.name == "ValidationError") {
    res.status = 400;
    return res.json({
      success: 0,
      message: err.errors,
      response: 400,
      data: {},
    });
  } else {
    if (err.msgCode == 3) {
      res.status(401);
      err.status = 401;
    }
    if (err.msgCode == 4) {
      res.status(200);
      err.status = 403;
    }

    if (err.status == 404) {
      return res.json({
        success: 0,
        message: "Not Found.",
        response: 404,
        data: {},
      });
    } else if (err.status == 401) {
      return res.json({
        success: 0,
        message: global.errors[err.msgCode].msg.EN,
        response: 401,
        data: {},
      });
    } else {
      if (!err.msgCode) {
        res.status(200);
        return res.json({
          success: 0,
          message: err.message,
          response: 400,
          data: {},
        });
      } else {
        if (err.msgCode === "0005") {
          return res.json({
            success: 0,
            message: err.message,
            response: 400,
            data: {},
          });
        } else {
          res.status(200);
          return res.json({
            success: 0,
            message: global.errors[err.msgCode].msg.EN,
            response: 400,
            data: {},
          });
        }
      }
    }
  }
};
