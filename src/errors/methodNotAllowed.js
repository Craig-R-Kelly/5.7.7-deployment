function methodNotAllowed(req, res, next) {
  res.status(405).json({
    error: `${req.method} not allowed for ${req.originalUrl}`
  });
}

module.exports = methodNotAllowed;
