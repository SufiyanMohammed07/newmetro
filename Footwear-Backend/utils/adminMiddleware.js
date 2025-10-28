export const verifyAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Access denied" });

  if (!req.user.isAdmin) return res.status(403).json({ msg: "Admin access required" });

  next();
};
// import jwt from 'jsonwebtoken';

// const protect = (req, res, next) => {
//   let token;
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith('Bearer')) {
//     try {
//       token = authHeader.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
//       req.user = decoded; 
//       next();
//     } catch (error) {
//       console.error("Token verification failed:", error);
//       return res.status(401).json({ msg: 'Not authorized, token failed or expired' });
//     }
//   } else {
//     return res.status(401).json({ msg: 'Not authorized, no token provided' });
//   }
// };

// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next(); 
//   } else {
//     return res.status(403).json({ msg: 'Access denied: Not authorized as an admin' });
//   }
// };

// export { protect, admin };
