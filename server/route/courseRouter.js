import express from "express";
import {
  createCourse,
  createLecture,
  deleteById,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
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

//to create a lecture
courseRouter.post(
  "/createlecture/:courseId",
  isAuth,
  requireRole("educator"),
  createLectureValidator,
  validate,
  createLecture
);

//to edit a lecture
courseRouter.post(
  "/editlecture/:lectureId",
  isAuth,
  requireRole("educator"),
  upload.single("videoUrl"),
  editLectureValidator,
  validate,
  editLecture
);

//to get all the lectures of a course
courseRouter.get("/getcourselectures/:courseId", isAuth, getCourseLecture);

//to delete a lecture
courseRouter.post(
  "/removelecture/:lectureId",
  isAuth,
  requireRole("educator"),
  removeLecture
);
export default courseRouter;
