const { UserModel } = require("../models/user.model")

class BalanceService {
  async setBalance(id, balance) {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { balance }, { new: true })

    return updatedUser.balance
  }
}

exports.balanceService = new BalanceService()
