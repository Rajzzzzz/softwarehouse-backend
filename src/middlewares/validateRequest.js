// middlewares/validateRequest.js
const { validationResult } = require('express-validator');

exports.validateRequest = (rules) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    next();
  };
};