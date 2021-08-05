const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // match:
      required: [true, "Email is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    token: {
      type: String,
      default: null
    },
    verificationToken: {
      type: String,
      default: null
    },
    isActive: {
      type: Boolean,
      default: false
    },
    balance: {
      type: Number,
      default: 0
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.statics.hashPassword = async password => {
  return bcryptjs.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
};

userSchema.statics.isPasswordCorrect = async (password, passwordHash) => {
  return bcryptjs.compare(password, passwordHash);
};

exports.UserModel = mongoose.model("User", userSchema);
