const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router.post("/register", customerController.registerCustomer);
router.get("/fetch", customerController.fetchCustomers);
router.put("/updateCus/:nic", customerController.updateCustomer);
router.delete("/deleteCus/:nic", customerController.deleteCustomer);
router.post("/uploadProfileImage/:nic", customerController.uploadProfileImage);
router.post("/loginCus", customerController.loginCustomer);
router.get("/getUser/:nic", customerController.getCustomer);

module.exports = router;
