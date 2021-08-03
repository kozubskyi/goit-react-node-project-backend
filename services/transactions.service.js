const { UserModel } = require("../models/user.model")
const uuid = require("uuid")
const { BadRequest } = require("http-errors")

class TransactionsService {
  async addExpenseTransaction(user, transaction) {
    const transactionWithId = { ...transaction, id: uuid.v4() }
    const updatedExpenses = [...user.transactions.expenses, transactionWithId]

    const updatedData = {
      transactions: { ...user.transactions, expenses: updatedExpenses },
      balance: user.balance - transaction.sum,
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, updatedData, { new: true })

    return updatedUser
  }

  async addIncomeTransaction(user, transaction) {
    const transactionWithId = { ...transaction, id: uuid.v4() }
    const updatedIncome = [...user.transactions.income, transactionWithId]

    const updatedData = {
      transactions: { ...user.transactions, income: updatedIncome },
      balance: user.balance + transaction.sum,
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, updatedData, { new: true })

    return updatedUser
  }

  async deleteTransaction(user, transactionId) {
    const incomeTransaction = user.transactions.income.find((transaction) => transaction.id === transactionId)

    if (!incomeTransaction) {
      const expenseTransaction = user.transactions.expenses.find((transaction) => transaction.id === transactionId)

      if (!expenseTransaction) throw new BadRequest(`Transaction with id '${transactionId}' was not found`)

      const updatedData = {
        balance: user.balance + expenseTransaction.sum,
        transactions: {
          income: user.transactions.income,
          expenses: user.transactions.expenses.filter((transaction) => transaction.id !== transactionId),
        },
      }

      const updatedUser = await UserModel.findByIdAndUpdate(user._id, updatedData, { new: true })

      return updatedUser
    }

    const updatedData = {
      balance: user.balance - incomeTransaction.sum,
      transactions: {
        income: user.transactions.income.filter((transaction) => transaction.id !== transactionId),
        expenses: user.transactions.expenses,
      },
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, updatedData, { new: true })

    return updatedUser
  }

  async getTransactionsByMonth(transactions, month) {
    const filteredTransactions = transactions.filter((transaction) => {
      const arr = transaction.date.split("-")
      const transactionMonth = `${arr[1]}-${arr[0]}`

      console.log(transactionMonth, month)

      return transactionMonth === month
    })

    if (filteredTransactions.length === 0) throw new BadRequest("No transactions in this month or bad request")

    return filteredTransactions
  }
}

exports.transactionsService = new TransactionsService()
