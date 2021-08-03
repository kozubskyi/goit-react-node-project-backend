const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    sum: {
      type: Number,
      min: [0.01, "Sum must be more then 0"],
      required: [true, "Sum is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    owner: {
      type: String,
      required: [true, "Owner is required"],
    },
  },
  { versionKey: false }
)

exports.TransactionModel = mongoose.model("Transaction", transactionSchema)
