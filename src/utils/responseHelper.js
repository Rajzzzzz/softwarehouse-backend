// utils/responseHelper.js
exports.successResponse = (res, message, data = null) => {
    return res.status(200).json({
      success: true,
      message,
      data
    });
  };
  
  exports.errorResponse = (res, message, error = null) => {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message,
      error: error?.message || null
    });
  };