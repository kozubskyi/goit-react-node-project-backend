const { UserModel } = require("../models/user.model")
const { BadRequest } = require("http-errors")

class BalanceService {
  setBalance(balance, userId) {
    const user = UserModel.findByIdAndUpdate(userId, { balance })

    if (!user) throw new BadRequest(`User with id ${userId} was not found`)
  }
}

exports.balanceService = new BalanceService()
