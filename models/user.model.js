const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcryptjs = require("bcryptjs");
require("dotenv").config();

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"]
    },
    token: {
      type: String,
      default: null
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"]
    }
  },
  { versionKey: false }
);

userSchema.statics.hashPassword = async password => {
  return bcryptjs.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
};

userSchema.statics.isPasswordCorrect = async (password, passwordHash) => {
  return bcryptjs.compare(password, passwordHash);
};

exports.UserModel = mongoose.model("User", userSchema);
