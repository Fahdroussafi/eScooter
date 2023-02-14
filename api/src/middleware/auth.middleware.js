const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../authentication-service/auth.model");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized,token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});
const role = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
// middleware pour les comptes actifs et non activ pour action de transaction

module.exports = { protect, role };
