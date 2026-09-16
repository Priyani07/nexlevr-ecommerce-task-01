const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req,res,next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({success:false,message:"Not authorized"});
    const decoded = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({success:false,message:"User not found"});
    req.user = user;
    next();
  } catch(e) { res.status(401).json({success:false,message:"Invalid or expired token"}); }
};

exports.adminOnly = (req,res,next) => {
  if (req.user?.role !== "admin") return res.status(403).json({success:false,message:"Admin access required"});
  next();
};
