exports = (...role) => {
  return (req, res, next) => {
    if (!role.indexOf(req?.user?.role)) {
    return res.status(401).json({status:"failed",error:"you cannot access this scope!"})
    }
    next()
  };
};
