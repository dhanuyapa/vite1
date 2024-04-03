const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router.post("/register", customerController.registerCustomer);
router.get("/fetchc", customerController.fetchCustomers);
router.put("/updateCus/:nic", customerController.updateCustomer);
router.delete("/deleteCus/:nic", customerController.deleteCustomer);

router.post("/loginCus", customerController.loginCustomer);
router.get("/getUser/:nic", customerController.getCustomer);
router.get("/searchC", customerController.searchCustomerByNIC);


module.exports = router;
