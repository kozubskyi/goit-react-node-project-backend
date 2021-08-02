function prepareUser(user) {
  return {
    id: user._id,
    email: user.email
  };
}

exports.prepareUser = prepareUser;
