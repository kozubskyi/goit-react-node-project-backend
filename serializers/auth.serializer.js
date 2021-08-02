const { prepareUser } = require("../serializers/user.serializer");

function prepareUserWithToken(userWithToken) {
  return {
    user: prepareUser(userWithToken.user),
    token: userWithToken.token
  };
}

exports.prepareUserWithToken = prepareUserWithToken;
