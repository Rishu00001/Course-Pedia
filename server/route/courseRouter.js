import express from "express";
import {
  createCourse,
  createLecture,
  deleteById,
  editCourse,
  editLecture,
  getCourseById,
  getCreatorCourses,
  getPublishedCourses,
  removeLecture,
} from "../controller/courseController.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { requireRole } from "../middleware/requireRole.js";
import {
  createLectureValidator,
  editLectureValidator,
} from "../validators/lectureValidator.js";
import { validate } from "../middleware/validator.js";

const courseRouter = express.Router();

courseRouter.post("/createcourse", isAuth, createCourse);
courseRouter.get("/getpublished", getPublishedCourses);
courseRouter.get("/creatorcourses", isAuth, getCreatorCourses);
courseRouter.post(
  "/editcourse/:courseId",
  isAuth,
  upload.single("thumbnail"),
  editCourse
);
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);
courseRouter.delete("/remove/:courseId", isAuth, deleteById);

//lecture routes
courseRouter.post(
  "/createlecture/:courseId",
  isAuth,
  requireRole("educator"),
  createLectureValidator,
  validate,
  createLecture
);

courseRouter.post(
  "/editlecture/:lectureId",
  isAuth,
  requireRole("educator"),
  editLectureValidator,
  validate,
  editLecture
);

courseRouter.post(
  "/removelecture/:lectureId",
  isAuth,
  requireRole("educator"),
  removeLecture
);
export default courseRouter;
