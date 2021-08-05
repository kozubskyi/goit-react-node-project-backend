const { Conflict, NotFound, Forbidden } = require("http-errors");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

class AuthService {
  async signUp({ email, password }) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict(`User with email '${email}' already exists`);
    }
    const newUser = await UserModel.create({
      email,
      password: await UserModel.hashPassword(password),
      verificationToken: uuid.v4()
    });
    return newUser;
  }

  async signIn({ email, password }) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound(`User with email '${email}' not found`);
    }
    const isPasswordCorrect = await UserModel.isPasswordCorrect(password, user.password);
    if (!isPasswordCorrect) {
      throw new Forbidden(`Provided password is wrong`);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    await UserModel.findOneAndUpdate({ email }, { token, isActive: true, verificationToken: null }, { new: true });

    return { user, token };
  }

  async signOut({ _id }) {
    await UserModel.findByIdAndUpdate(_id, { token: null, isActive: false }, { new: true });
  }
}

exports.authService = new AuthService();
