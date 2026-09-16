const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const tokenFor = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success:false, message:"Name, email and password are required" });
    if (password.length < 6) return res.status(400).json({ success:false, message:"Password must be at least 6 characters" });
    const normalized = email.toLowerCase().trim();
    if (await User.findOne({ email: normalized })) return res.status(400).json({ success:false, message:"User already exists" });
    const user = await User.create({ name:name.trim(), email:normalized, password:await bcrypt.hash(password,10) });
    res.status(201).json({ success:true, message:"Registration successful", token:tokenFor(user._id), user:{id:user._id,name:user.name,email:user.email,role:user.role} });
  } catch(e) { res.status(500).json({ success:false, message:"Registration failed", error:e.message }); }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email:(email||"").toLowerCase().trim() });
    if (!user || !(await bcrypt.compare(password||"", user.password))) return res.status(401).json({ success:false, message:"Invalid email or password" });
    res.json({ success:true, message:"Login successful", token:tokenFor(user._id), user:{id:user._id,name:user.name,email:user.email,role:user.role} });
  } catch(e) { res.status(500).json({ success:false, message:"Login failed" }); }
};

exports.getMe = async (req,res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ success:true, user });
};
