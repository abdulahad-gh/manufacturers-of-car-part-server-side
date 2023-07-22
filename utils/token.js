const jwt = require("jsonwebtoken");

module.exports.generateToken = (userInfo) => {
  console.log(' module')
  const payload = {
    email: userInfo.email,
    name: userInfo.name,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET_KAY, {
    expiresIn: "30s"
  });

  return token;
};
