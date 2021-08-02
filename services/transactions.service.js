const { UserModel } = require("../models/user.model")
const uuid = require("uuid")

class TransactionsService {
  async addExpenseTransaction(user, transaction) {
    const transactionWithIdAndTime = { ...transaction, id: uuid.v4(), time: new Date(Date.now()) }
    const updatedExpenses = [...user.transactions.expenses, transactionWithIdAndTime]

    const updatedData = {
      transactions: { ...user.transactions, expenses: updatedExpenses },
      balance: user.balance - transaction.sum,
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, updatedData, { new: true })

    return updatedUser
  }

  async addIncomeTransaction(user, transaction) {
    const transactionWithIdAndTime = { ...transaction, id: uuid.v4(), time: new Date(Date.now()) }
    const updatedIncome = [...user.transactions.income, transactionWithIdAndTime]

    const updatedData = {
      transactions: { ...user.transactions, income: updatedIncome },
      balance: user.balance + transaction.sum,
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, updatedData, { new: true })

    return updatedUser
  }
}

exports.transactionsService = new TransactionsService()
