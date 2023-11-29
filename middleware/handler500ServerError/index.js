function handler500ServerError(req, res, next) {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}

module.exports = handler500ServerError;