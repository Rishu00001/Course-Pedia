import express from "express";
const reviewRouter = express.Router();
import {
  createReview,
  getCourseReviews,
} from "../controller/reviewController.js";
import isAuth from "../middleware/isAuth.js";

reviewRouter.post("/createreview",isAuth , createReview);
reviewRouter.get("/getreviews/", getCourseReviews);
export default reviewRouter;