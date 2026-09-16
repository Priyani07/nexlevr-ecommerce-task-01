const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: [orderItemSchema], required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: "Demo Payment" },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  orderStatus: { type: String, enum: ["Processing","Confirmed","Shipped","Delivered","Cancelled"], default: "Processing" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
