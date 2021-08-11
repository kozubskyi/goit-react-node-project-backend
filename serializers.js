exports.prepareUserWithToken = ({ user, token, type, balance }) => ({ email: user.email, token, type, balance })

exports.prepareUser = ({ email, type, balance }) => ({ email, type, balance })
