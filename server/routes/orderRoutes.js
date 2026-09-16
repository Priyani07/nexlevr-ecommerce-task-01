const router = require("express").Router();
const c = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
router.use(protect);
router.post("/", c.createOrder);
router.get("/mine", c.getMyOrders);
router.get("/", adminOnly, c.getAllOrders);
router.patch("/:id/status", adminOnly, c.updateOrderStatus);
module.exports = router;
