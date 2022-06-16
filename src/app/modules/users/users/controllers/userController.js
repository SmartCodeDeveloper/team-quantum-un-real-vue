import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt'
import {
  sendMail
} from '../helpers/mailer'
const responseModule = require('../../../../../config/response');
import winston from '../../../../../config/winston';


/**
 * Function to create a User
 * @param {Object} req 
 * @param {Object} res 
 */
export const userSignup = async (req, res, next) => {

  const password = bcrypt.hashSync(req.body.password, 10);
  const otp = otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const user = new User({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    otp: otp,
    password: password,
    walletAddress: req.body.walletAddress
  })
  if (req.file) {
    const profileImage = req.file.path
    user.profileImage = profileImage
  }
  try {
    sendMail(user.email, otp)
    await user.save((error, result) => {
      if (error) {
        if (error.name == 'ValidationError' || 'MongoServerError') {
          return res.status(400).json({
            success: 0,
            message: error.message,
            response: 400,
            data: {}
          });
        }
        return responseModule.errorResponse(res, {
          success: 0,
          message: error.message,
          data: {}
        });
      } else {
        return responseModule.successResponse(res, {
          success: 1,
          message: 'User created successfully',
          data: result
        });
      }
    })
  } catch (err) {
    winston.error(err);
    return next(err);
  }
}


/**
 * Function to Login User
 * @param {Object} req 
 * @param {Object} res 
 */
export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      status: true
    }).exec()
    
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return responseModule.errorResponse(res, {
            success: 0,
            message: err.message,
            data: {}
          });
        }
        if (result === true) {
          const token = jwt.sign({
            email: user.email,
            userId: user._id
          }, config.JWT_KEY, {
            expiresIn: "7h"
          });
          return responseModule.successResponse(res, {
            success: 1,
            message: "User Login successfull",
            data: user,
            token: token
          });
        }
        if (result === false) {
          return res.status(401).json({
            message: 'Invalid Password'
          })
        }
      })
    } else {
      return res.status(401).json({
        message: 'You are not an Verified User',
        data: {},
        response: 401
      })
    }

  } catch (err) {
    winston.error(err);
    return next(err);
  }
}


/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export const updateUser = async (req, res, next) => {
  try {

    const updates = {
      userName: req.body.userName,
      name: req.body.name,
      walletAddress: req.body.walletAddress,
      email: req.body.email,
      status: req.body.status,
      walletAddress: req.body.walletAddress

    }
    if (req.file) {
      const profileImage = req.file.path;
      updates.profileImage = profileImage
    }

    if(req.body.password){
      updates.password = bcrypt.hashSync(req.body.password, 10);

    }
    const user = await User.findOneAndUpdate({
      _id: req.params.Id
    }, {
      $set: updates
    }, {
      new: true
    }).exec((error, response) => {
      if (error) {
        if (error.name == 'ValidationError' || 'MongoServerError') {
          return res.status(400).json({
            success: 0,
            message: error.message,
            response: 400,
            data: {}
          });
        }
        return responseModule.errorResponse(res, {
          success: 0,
          message: "Could not update user details"
        });
      } else {

        return responseModule.successResponse(res, {
          success: 1,
          message: "User Details updated successfully",
          data: response
        });
      }
    })

  } catch (err) {
    console.log(err);
    return next(err);
  }
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export const emailVerification = async (req, res, next) => {
  try {
    const id = req.params.Id;
    const user = await User.findById(id).exec()

    if (user.otp == req.body.otp) {
      const updates = {
        status: true,
      }
      await User.findOneAndUpdate({
        _id: id
      }, {
        $set: updates
      }, {
        new: true
      }).exec((error, response) => {
        if (error) {
          if (error.name == 'ValidationError' || 'MongoServerError') {
            return res.status(400).json({
              success: 0,
              message: error.message,
              response: 400,
              data: {}
            });
          }
          return responseModule.errorResponse(res, {
            success: 0,
            message: "Could not update user details"
          });
        } else {
          return responseModule.successResponse(res, {
            success: 1,
            message: "User Details updated successfully",
            data: response
          });
        }
      })
    } else {
      return res.status(400).json({
        success: 0,
        message: "Invalid Otp",
        response: 401,
        data: {}
      });
    }

  } catch (err) {
    console.log(err);
    return next(err);
  }
};




/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
 export const passwordReset = async (req, res, next) => {
  try {
    const otp = otpGenerator.generate(5, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const updates = {
      otp: otp
    }
    const user = await User.findOne({_id: req.params.Id}).exec()
    sendMail(user.email, otp)

       await User.findOneAndUpdate({
      _id: req.params.Id
    }, {
      $set: updates
    }, {
      new: true
    }).exec((error, response) => {
      if (error) {
        if (error.name == 'ValidationError' || 'MongoServerError') {
          return res.status(400).json({
            success: 0,
            message: error.message,
            response: 400,
            data: {}
          });
        }
        return responseModule.errorResponse(res, {
          success: 0,
          message: error.message,
          data: {}
        });
      } else {
        return responseModule.successResponse(res, {
          success: 1,
          message: "User Details updated successfully",
          data: response
        });
      }
    })

  } catch (err) {
    console.log(err);
    return next(err);
  }
};