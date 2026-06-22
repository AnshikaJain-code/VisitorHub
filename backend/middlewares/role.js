// Usage: authorize('admin', 'security')
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user ? req.user.role : 'unknown'}' is not permitted to perform this action`,
      });
    }
    next();
  };
};

module.exports = { authorize };
