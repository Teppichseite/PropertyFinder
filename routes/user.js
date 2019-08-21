const express = require('express');
const router = express.Router();

const uController = require("../controllers/user-controller.js");

router.get('/find_properties', uController.findProperties);

router.get('/exec_booking_request', uController.execBookingRequest);

module.exports = router;