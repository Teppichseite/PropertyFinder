const express = require('express');
const router = express.Router();

const uController = require("../controllers/user-controller.js");

router.get('/:userId/bookings', uController.findBookingsByUserId);

router.post('/booking/new', uController.createNewBooking);

module.exports = router;