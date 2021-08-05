const { TransactionModel } = require("../models/transaction.model");
const { UserModel } = require("../models/user.model");
const { BadRequest, Forbidden } = require("http-errors");
const { ObjectId } = require("mongodb");

class TransactionsService {
  async addTransaction(userId, transaction) {
    const createdTransaction = await TransactionModel.create({ ...transaction, owner: userId });
    const user = await UserModel.findById(userId);

    if (transaction.type === "expense") {
      await UserModel.findByIdAndUpdate(userId, { balance: user.balance - transaction.sum });
    }
    if (transaction.type === "income") {
      await UserModel.findByIdAndUpdate(userId, { balance: user.balance + transaction.sum });
    }

    return createdTransaction;
  }

  async deleteTransaction(userId, transactionId) {
    const transaction = await TransactionModel.findById(transactionId);
    const user = await UserModel.findById(userId);

    if (!transaction) throw new BadRequest(`There is no transaction with id '${transactionId}'`);

    if (transaction.owner.toString() !== userId.toString()) throw new Forbidden(`You can't delete this transaction`);

    await TransactionModel.findByIdAndDelete(transactionId);

    if (transaction.type === "expense") {
      await UserModel.findByIdAndUpdate(userId, { balance: user.balance + transaction.sum });
    }
    if (transaction.type === "income") {
      await UserModel.findByIdAndUpdate(userId, { balance: user.balance - transaction.sum });
    }
  }

  async getSummary(userId, type) {
    const transactions = await TransactionModel.find({ owner: new ObjectId(userId), type })

    const obj = {
      "01": "jan",
      "02": "feb",
      "03": "mar",
      "04": "apr",
      "05": "may",
      "06": "jun",
      "07": "jul",
      "08": "aug",
      "09": "sep",
      10: "oct",
      11: "nov",
      12: "dec"
    };

    const summary = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0
    };

    const thisYearTransactions = transactions.filter((transaction) => {
      const transactionYear = Number(transaction.date.split(".")[2])
      const currentYear = new Date(Date.now()).getFullYear()
      return transactionYear === currentYear
    })

    thisYearTransactions.forEach(transaction => {
      const transactionMonth = transaction.date.split(".")[1];
      const month = obj[transactionMonth];
      summary[month] += transaction.sum;
    });

    return summary;
  }

  async getInfoForPeriod(userId, period) {
    const transactions = await TransactionModel.find({ owner: new ObjectId(userId) })

    const neededTransactions = transactions.filter((transaction) => {
      const transactionPeriod = transaction.date.substring(3)
      return transactionPeriod === period
    })

    // const info = {
    //   expenses: {},
    //   income: {
    //     salary: {
    //       sum,
    //     },
    //   },
    // }

    // return neededTransactions
  }
}

exports.transactionsService = new TransactionsService();
