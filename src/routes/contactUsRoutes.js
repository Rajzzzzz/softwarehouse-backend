// src/routes/contactUsRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactUsController');

router.post('/submit', contactController.submitContact);

module.exports = router;