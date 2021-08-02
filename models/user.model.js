const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: {
      income: { type: Array },
      expenses: { type: Array },
    },
  },
  { versionKey: false }
)

// Пример хранения транзакции
// const transaction = {
//   category: String,
//   sum: Number,
//   time: Date,
//   description: String,
// }

userSchema.statics.hashPassword = async (password) => {
  return bcryptjs.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
}

userSchema.statics.isPasswordCorrect = async (password, passwordHash) => {
  return bcryptjs.compare(password, passwordHash)
}

exports.UserModel = mongoose.model("User", userSchema)
