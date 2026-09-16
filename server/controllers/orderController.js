const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req,res) => {
  try {
    const { items, shippingAddress, paymentMethod="Demo Payment" } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({success:false,message:"Cart is empty"});
    let totalAmount = 0;
    for (const item of items) {
      const p = await Product.findById(item.product);
      if (!p) return res.status(400).json({success:false,message:"Product not found"});
      if (p.stock < item.quantity) return res.status(400).json({success:false,message:`Insufficient stock for ${p.name}`});
      totalAmount += p.price * item.quantity;
    }
    const order = await Order.create({user:req.user._id,items,shippingAddress,totalAmount,paymentMethod,paymentStatus:"Paid"});
    for (const item of items) await Product.findByIdAndUpdate(item.product,{$inc:{stock:-item.quantity}});
    res.status(201).json({success:true,order});
  } catch(e) { res.status(500).json({success:false,message:e.message}); }
};

exports.getMyOrders = async (req,res) => {
  const orders = await Order.find({user:req.user._id}).sort({createdAt:-1});
  res.json({success:true,orders});
};

exports.getAllOrders = async (req,res) => {
  const orders = await Order.find().populate("user","name email").sort({createdAt:-1});
  res.json({success:true,orders});
};

exports.updateOrderStatus = async (req,res) => {
  const order = await Order.findByIdAndUpdate(req.params.id,{orderStatus:req.body.orderStatus},{new:true});
  if (!order) return res.status(404).json({success:false,message:"Order not found"});
  res.json({success:true,order});
};
