const {promisify} = require("util")
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res
        .status(401)
        .json({ status: "failed", error: "you're not logged in" });
    }
    const decoded = await promisify(jwt.verify)(token,process.env.TOKEN_SECRET_KAY)
    req.user = decoded
    next()

  } catch (error) {
    res.status(403).json({ status: "fail", error: "token invalid!" });
  }
};
