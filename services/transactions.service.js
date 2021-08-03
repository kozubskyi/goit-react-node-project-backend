const { TransactionModel } = require("../models/transaction.model")
const { BadRequest, Forbidden } = require("http-errors")
const { ObjectId } = require("mongodb")

class TransactionsService {
  async addTransaction(userId, transaction) {
    const createdTransaction = await TransactionModel.create({ ...transaction, owner: userId })

    return createdTransaction
  }

  async deleteTransaction(userId, transactionId) {
    const transaction = await TransactionModel.findById(transactionId)

    if (!transaction) throw new BadRequest(`There is no transaction with id '${transactionId}'`)

    if (transaction.owner.toString() !== userId.toString()) throw new Forbidden(`You can't delete this transaction`)

    await TransactionModel.findByIdAndDelete(transactionId)
  }

  async getTransactionsByMonth(userId, month, type = "expense") {
    const userTransactions = await TransactionModel.find({ owner: new ObjectId(userId) })

    const neededTransactions = userTransactions.filter((transaction) => {
      const dateArr = transaction.date.split(".")
      const transactionMonth = `${dateArr[1]}-${dateArr[2]}`

      return transaction.type === type && transactionMonth === month
    })

    return neededTransactions
  }
}

exports.transactionsService = new TransactionsService()
