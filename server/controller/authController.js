import validator from "validator";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import TokenBlackList from "../model/tokenBlackList.js";
import sendMail from "../config/sendMail.js";
export const signup = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();
    if (!name) {
      throw new Error("invalid name or email");
    } else if (name.length < 3 || name.length > 50 || !name.includes(" ")) {
      throw new Error("invalid name or email");
    }
    if (!validator.isEmail(email)) {
      throw new Error("invalid name or email");
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      throw new Error("password too weak");
    }
    //the data is validated , then signup the user
    //check if the user already exist in the db

    let existUser = await User.findOne({ email });
    if (existUser) {
      throw new Error("user already exist");
    }
    //hash the password
    const hashed = await bcrypt.hash(password, 10);

    //create the user in the database
    let user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });
    user = user.toObject();
    delete user.password;
    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if the user exist in db
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("invalid username or password");
    }
    //check if the password is true or not

    const isPasswordTrue = await bcrypt.compare(password, user.password);

    if (!isPasswordTrue) {
      throw new Error("invalid username or password");
    }

    //if password matches then generate the token
    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    user = user.toObject();
    delete user.password;
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    // // Verify token first (avoid junk tokens in DB)
    // try {
    //   jwt.verify(token, process.env.JWT_SECRET);
    // } catch (err) {
    //   return res.status(401).json({ message: "Invalid or expired token" });
    // }

    //  Add to blacklist only if valid
    const alreadyBlacklisted = await TokenBlackList.findOne({ token });
    if (!alreadyBlacklisted) {
      await new TokenBlackList({ token }).save();
    }

    //  Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // use true in production with HTTPS
      sameSite: "Lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({message: "something went wrong"});
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    //put the otp for password reset in the user model
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();

    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "can't send otp" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid otp" });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "otp verification error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "otp verification is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "can't reset password" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    let user = await User.findOne({ email }); // 👈 let
    if (!user) {
      user = await User.create({
        name,
        email,
        role,
      });
    }
    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  // true in production with HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Google Auth Error:", error); // 👈 log the real error
    return res.status(500).json({ message: "google auth error" });
  }
};

