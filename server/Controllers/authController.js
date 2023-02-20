const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../Utils/responseWrapper");

//TODO: Registered New User
const signupController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send(error(400, "All fields are required"));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send(error(409, "User is already registered"));
    }

    //! Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //* Create New User
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //? Return User
    return res.send(success(201, user));
  } catch (error) {
    console.log(error);
  }
};

//TODO: Login User
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All fields are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.send(error(401, "User is not registered"));
    }

    //! Match the entered password with the login password
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.send(error(403, "Incorrect Password"));
    }

    //! Calling The generateAccessToken 2
    const accessToken = generateAccessToken({ _id: user._id });

    //! Calling The generateRefreshToken 5
    const refreshToken = generateRefreshToken({ _id: user._id });

    //TODO: Store the refreshToken in the cookie 7
    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,
    });

    return res.send(success(200, { accessToken }));
  } catch (error) {
    console.log(error);
  }
};

//* Internal Functions
//! Generate The Access Token 1
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "30s",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};

//! This API will check the refreshToken validity and generate a new access Token 6
const refreshAccessTokenController = async (req, res, next) => {
  //TODO: Access the refreshToken from the cookie 8
  const cookies = req.cookies;
  if (!cookies.RefreshToken) {
    return res.send(error(401, "Refresh token in cookie is required"));
  }

  const refreshToken = cookies.RefreshToken;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );

    const id = decoded._id;

    //* Generate The New Access Token When Refresh Token Is Valid
    //! Calling The generateAccessToken
    const accessToken = generateAccessToken({ _id: id });
    return res.send(success(201, { accessToken: accessToken }));
  } catch (e) {
    return res.send(error(401, "Invalid refresh token"));
  }
};

//! Generate The Refresh Token 4 (this give you a new access token when it will expired)
const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
};
