const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const payload = {
    email: userInfo.email,
    name: userInfo.name,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET_KAY, {
    expiresIn: "20",
  });

  return token;
};
