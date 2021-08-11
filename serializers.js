exports.prepareUserWithToken = ({ user, token }) => ({
  email: user.email,
  token,
  type: user.type,
  balance: user.balance,
})

exports.prepareUser = ({ email, type, balance }) => ({ email, type, balance })
