const express = require('express');
const router = express.Router();

const propertyController = require("../controllers/property-controller");

router.get('/:propertyId/bookings', propertyController.findBookingsByPropertyId);

router.get('/', propertyController.findProperties);

module.exports = router;