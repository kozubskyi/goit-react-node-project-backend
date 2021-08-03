const { TransactionModel } = require("../models/transaction.model")
const { UserModel } = require("../models/user.model")
const { BadRequest, Forbidden } = require("http-errors")
const { ObjectId } = require("mongodb")

class TransactionsService {
  async addTransaction(userId, transaction) {
    const createdTransaction = await TransactionModel.create({ ...transaction, owner: userId })
    const user = await UserModel.findById(userId)

    if (transaction.type === "expense") {
      await UserModel.findByIdAndUpdate(userId, { balance: user.balance - transaction.sum })
    }
    if (transaction.type === "income") {
      await UserModel.findByIdAndUpdate(userId, { balance: user.balance + transaction.sum })
    }

    return createdTransaction
  }

  async deleteTransaction(userId, transactionId) {
    const transaction = await TransactionModel.findById(transactionId)

    if (!transaction) throw new BadRequest(`There is no transaction with id '${transactionId}'`)

    if (transaction.owner.toString() !== userId.toString()) throw new Forbidden(`You can't delete this transaction`)

    if (transaction.type === "expense") {
      await UserModel.findByIdAndUpdate(userId, { balance: user.balance + transaction.sum })
    }
    if (transaction.type === "income") {
      await UserModel.findByIdAndUpdate(userId, { balance: user.balance - transaction.sum })
    }

    await TransactionModel.findByIdAndDelete(transactionId)
  }

  async getTransactionsByMonth(userId, month, type = "expense") {
    const userTransactions = await TransactionModel.find({ owner: new ObjectId(userId), type })

    const neededTransactions = userTransactions.filter((transaction) => {
      const dateArr = transaction.date.split(".")
      const transactionMonth = `${dateArr[1]}-${dateArr[2]}`

      return transactionMonth === month
    })

    return neededTransactions
  }
}

exports.transactionsService = new TransactionsService()
