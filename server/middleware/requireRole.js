export const requireRole = (role) => {
  return (req, res, next) => {
    if (req.role != role) {
      return res.status(400).json({ message: "forbidden" });
    }
    next();
  };
};
