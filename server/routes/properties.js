const express = require('express');
const router = express.Router();

const propertyValidator = require("../validators/property-validator.js");
const propertyController = require("../controllers/property-controller");

router.get('/:propertyId/bookings', 
    propertyValidator.validateFindBookingsByPropertyId(), 
    propertyController.findBookingsByPropertyId);

router.post('/', 
    propertyValidator.validateFindProperties(), 
    propertyController.findProperties);

module.exports = router;