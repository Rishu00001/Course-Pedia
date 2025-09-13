import express from "express";
import {
  googleAuth,
  login,
  logout,
  resetPassword,
  sendOtp,
  signup,
  verifyOtp,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/googleauth",googleAuth)
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword",resetPassword);

export default authRouter;
