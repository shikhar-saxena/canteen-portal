const jwt = require("jsonwebtoken");

// Verification middleware (for protected routes)
function authenticateToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  const token = bearerHeader && bearerHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Please login to access this page" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res
        .sendStatus(403)
        .json({ error: "Please login to access this page" });
    req.user = user; // set user data
    next();
  });
}

module.exports = authenticateToken;
