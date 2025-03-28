exports.successResponse = (res, message, data = null) => {
    res.json({ success: true, message, data });
  };
  
exports.errorResponse = (res, error, statusCode = 400) => {
    res.status(statusCode).json({ success: false, error });
  };
  