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
  try {

    if (req.body.password) {
      var password = bcrypt.hashSync(req.body.password, 10);
    }

    const otp = otpGenerator.generate(5, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      otp: otp,
      password: password,
    })
    sendMail(user.email, otp)
    await user.save((error, result) => {
      if (error) {
        return responseModule.errorResponse(res, error);
      } else {
        return responseModule.successResponse(res, {
          success: 1,
          message: 'User created successfully',
          data: {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            isVerified: result.isVerified,
            _id: result._id

          }
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
      isVerified: true
    }).exec()
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return responseModule.errorResponse(res, error);
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
            success: 0,
            message: "Invalid Password",
            response: 401,
            data: {}
          })
        }
      })
    } else {
      return res.status(401).json({
        success: 0,
        message: "You are not an verfied user",
        response: 400,
        data: {}
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      walletAddress: req.body.walletAddress,
      email: req.body.email,
      isVerified: req.body.isVerified,
      walletAddress: req.body.walletAddress

    }
    if (req.file) {
      const profileImage = req.file.path;
      updates.profileImage = profileImage
    }

    if (req.body.password) {
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
        return responseModule.errorResponse(res, error);

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
    await User.findById(id).exec(async(err, user)=>{

      if(err){
        return responseModule.errorResponse(res, err);
      }
      if (user.otp == req.body.otp) {
        const updates = {
          isVerified: true,
        }
        await User.findOneAndUpdate({
          _id: id
        }, {
          $set: updates
        }, {
          new: false
        }).exec((error, response) => {
          if (error) {
            return responseModule.errorResponse(res, error);
  
          } else {
            return responseModule.successResponse(res, {
              success: 1,
              message: "User Details updated successfully",
              data: {isVerified: response.isVerified}
            });
          }
        })
      } else {
        return res.status(400).json({
          success: 0,
          message: "Invalid Otp",
          response: 400,
          data: {}
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
    const user = await User.findOne({
      _id: req.params.Id
    }).exec()
    sendMail(user.email, otp)

    await User.findOneAndUpdate({
      _id: req.params.Id
    }, {
      $set: updates
    }, {
      new: true
    }).exec((error, response) => {
      if (error) {
        return responseModule.errorResponse(res, error);

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