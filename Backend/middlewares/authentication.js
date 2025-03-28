const jwt = require("jsonwebtoken");

const secret = 'QloudDevelopmentSecretKeyMartinMarvan'

module.exports = {
  authenticateUser: (req, res, next) => {
    const authHeader = req.header("Authorization");

    // Validate Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    try {
      const verified = jwt.verify(token, secret);
      req.user = verified;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }
  },

  authorizeBusiness: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    if (req.user.role !== "BUSINESSPERSON") {
      return res.status(403).json({ error: "Access restricted to Business Users only." });
    }

    next();
  }
};
