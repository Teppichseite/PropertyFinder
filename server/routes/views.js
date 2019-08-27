const express = require('express');
const router = express.Router();

const ViewController = require('../controllers/view-controller.js');

router.get('/', ViewController.sendIndexPage);

module.exports = router;