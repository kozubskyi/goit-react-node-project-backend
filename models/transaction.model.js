const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required"],
    },
    category: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "category",
      type: String,
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    sum: {
      type: Number,
      required: [true, "Sum is required"],
    },
    date: {
      type: String,
      // match: 
      required: [true, "Date is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Owner is required"],
    },
  },
  { versionKey: false, timestamps: true }
)

exports.TransactionModel = mongoose.model("Transaction", transactionSchema)
