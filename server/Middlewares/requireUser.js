const jwt = require("jsonwebtoken");
const { error} = require("../Utils/responseWrapper");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "Authorization header is required"));
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  //! Verify the Header Access Token With The Signature Private Key 3
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req._id = decoded._id;
    next();
  } catch (e) {
    return res.send(error(401, "Invalid access key"));
  }
};
