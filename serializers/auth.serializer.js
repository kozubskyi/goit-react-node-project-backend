function prepareUserWithToken(userWithToken) {
  return {
    id: userWithToken.user._id,
    email: userWithToken.user.email,
    token: userWithToken.token
  };
}

exports.prepareUserWithToken = prepareUserWithToken;
