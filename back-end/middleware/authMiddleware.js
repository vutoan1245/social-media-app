import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access Denied: No token provided." });
    }

    if (token.startsWith("Bearer ")) {
      token = token.replace(/^Bearer\s+/, "");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Token expired. Access Denied." });
        }
        return res
          .status(401)
          .json({ message: "Invalid token. Access Denied." });
      }
      req.user = decodedToken;
      next();
    });
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
