const express = require('express');
const router = express.Router();

const apiController = require("../controllers/api-controller");

router.get('/find_bookings_by_property_id', apiController.findBookingsByPropertyId);

router.get('/find_bookings_by_user_id', apiController.findBookingsByUserId);

module.exports = router;