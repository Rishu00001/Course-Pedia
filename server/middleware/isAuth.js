import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "token not found" });
    }
    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

    if(!verifyToken){
        return res.status(400).json({message : "token is invalid"})
    }
    const user = await User.findById(verifyToken.userId);
    if(!user){
      return res.status(404).json({message : "Not found"})
    }
    req.userId = verifyToken.userId;
    req.role = user.role;
    next();
  } catch (error) {
    return res.status(500).json({message : error.message})
  }
};
export default isAuth;
