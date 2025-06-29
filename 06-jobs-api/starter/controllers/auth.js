const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // the following(hashing the password) will be done using mongoose middleware
  // const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...req.body });
  // also creating the token to be handled in mongoose
  // const token = jwt.sign(
  //   { userId: user._id, name: user.name },
  //   process.env.JWT_SECRET,
  //   { expiresIn: process.env.JWT_LIFETIME }
  // );
  const token = user.createToken(); // created in mongoose
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password will be done in the mongoose schema
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password");
  }
  const token = user.createToken();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
