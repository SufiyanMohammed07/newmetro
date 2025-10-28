// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ msg: "Access Denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid Token" });
//   }
// };

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ msg: "Access Denied" });

  // 🔥 Extract the token after "Bearer "
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(400).json({ msg: "Invalid Token" });
  }
};
