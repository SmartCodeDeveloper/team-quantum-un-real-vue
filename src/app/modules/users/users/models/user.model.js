import mongoose from 'mongoose'

/**
 * User Schema
 */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must not be empty'],
    },
    userName:  {
        type: String,
        unique: true,
        sparse: true

    },

    profileImage: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        validate: {
          validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email"
        },
        required: [true, "User Email must not be empty"]
      },
    password: {
        type: String,
        required: true
    },
    otp:{
        type: Number,
    },
    status: {
        type : Boolean,
        default: false
    },
    walletAddress: {
        type: String,
        uppercase: true,
        lowercase: true,
        unique: true,
        sparse: true
    }
   
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);