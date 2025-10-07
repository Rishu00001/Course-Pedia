import express from "express";
import { createOrder, verifyPayment } from "../controller/orderController.js";
const paymentRouter = express.Router();
paymentRouter.post("/createorder", createOrder);
paymentRouter.post("/verifypayment", verifyPayment);
export default paymentRouter;