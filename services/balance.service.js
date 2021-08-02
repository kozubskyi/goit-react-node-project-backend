const { UserModel } = require("../models/user.model")
const { BadRequest } = require("http-errors")

class BalanceService {
  async setBalance(id, balance) {
    await UserModel.findByIdAndUpdate(id, { balance })
  }
}

exports.balanceService = new BalanceService()
