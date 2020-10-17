const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user.controller");
const { updateProduct, updateStock } = require("../controllers/artist.controller");
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/post.controller");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//routes
//create
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

//read
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

//status of order
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;