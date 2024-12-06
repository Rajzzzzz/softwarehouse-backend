// src/controllers/contactUsController.js
const Contact = require('../models/contactUsModel');
const emailService = require('../services/emailService');
const { successResponse, errorResponse } = require('../utils/responseHelper');

exports.submitContact = async (req, res) => {
  try {
    const { email, name, address, message } = req.body;

    // Create new contact entry
    const contact = new Contact({
      email,
      name,
      address,
      message
    });

    // Save to database
    await contact.save();

    // Try to send email but don't fail if it doesn't work
    try {
      await emailService.sendContactNotification({
        email,
        name,
        message
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue processing even if email fails
    }

    return successResponse(res, 'Contact form submitted successfully', contact);
  } catch (error) {
    return errorResponse(res, 'Error submitting contact form', error);
  }
};