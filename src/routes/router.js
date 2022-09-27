const express = require("express");
const router = express.Router();
const products = require("../controllers/productControllers.js");
const users = require("../controllers/userControllers.js");
const admins = require("../controllers/adminControllers.js");
const clients = require("../controllers/clientControllers.js");
const carts = require("../controllers/cartControllers.js");
const orders = require("../controllers/orderControllers.js");

router.get("/products/", products.productsControllers.getProducts);
router.post("/products", products.productsControllers.insertProduct);
router.put("/products/:id", products.productsControllers.updateProduct);
router.delete("/products/:id", products.productsControllers.deleteProduct);

router.get("/users", users.userControllers.getUsers);
router.post("/users", users.userControllers.insertUser);
router.put("/users/:id", users.userControllers.updateUser);
router.delete("/users/:id", users.userControllers.deleteUser);

router.get("/admins", admins.adminControllers.getAdmins);
router.post("/admins", admins.adminControllers.insertAdmin);
router.put("/admins/:id", admins.adminControllers.updateAdmin);
router.delete("/admins/:id", admins.adminControllers.deleteAdmin);

router.get("/clients", clients.clientControllers.getClients);
router.post("/clients", clients.clientControllers.insertClient);
router.put("/clients/:id", clients.clientControllers.updateClient);
router.delete("/clients/:id", clients.clientControllers.deleteClient);

router.get("/carts/:id", carts.cartControllers.getCarts);
router.post("/carts", carts.cartControllers.insertCarts);
router.delete("/carts/:id", clients.clientControllers.deleteClient);

router.get("/orders", orders.orderControllers.getOrders);
router.post("/orders", orders.orderControllers.insertOrder);

module.exports = router;
