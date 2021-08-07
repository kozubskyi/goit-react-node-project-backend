exports.prepareUserWithToken = ({ user, token, type }) => ({ email: user.email, token, type: user.type })

exports.prepareUser = ({ email, type }) => ({ email, type })
