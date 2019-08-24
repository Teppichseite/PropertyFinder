const express = require('express');
const router = express.Router();

const uValidator = require("../validators/user-validator.js");
const uController = require("../controllers/user-controller.js");

router.get('/:userId/bookings', 
    uValidator.validateFindBookingsByUserId(), 
    uController.findBookingsByUserId);

router.post('/booking/new', 
    uValidator.validateCreateNewBooking(), 
    uController.createNewBooking);

module.exports = router;