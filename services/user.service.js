const { UserModel } = require("../models/user.model")

class UserService {
  async setBalance(id, balance) {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { balance }, { new: true })

    return updatedUser.balance
  }
}

exports.userService = new UserService()
