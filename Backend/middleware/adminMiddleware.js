const adminMiddleware = (req, res, next) => {
  // Check if user is authenticated and is an admin
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized. Admin access required." });
  }

  next();
};

module.exports = adminMiddleware;
