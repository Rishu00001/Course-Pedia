import Razorpay from "razorpay";
import dotenv from "dotenv";
import e from "express";
import Course from "../model/courseModel.js";
import User from "../model/userModel.js";
dotenv.config();

// Create an instance of Razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const options = {
      amount: course.price * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).json({ message: "Some error occured" });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const verifyPayment = async (req, res) => {
  try {
    const { courseId, userId, razorpay_order_id } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const orderInfo = await instance.orders.fetch(razorpay_order_id);
    if (!orderInfo) return res.status(404).json({ message: "Order not found" });

    if (orderInfo.status !== "paid")
      return res.status(400).json({ message: "Payment not completed" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.enrolledCourses.includes(courseId))
      return res
        .status(400)
        .json({ message: "User already enrolled in the course" });
    user.enrolledCourses.push(courseId);
    await user.save();
    course.enrolledStudents.push(userId);
    await course.save();
    res
      .status(200)
      .json({ success: true, message: "Payment verified and course enrolled" });
  } catch (error) {
    res.status(500).json(error);
  }
};
