import { body, param } from "express-validator";

export const createLectureValidator = [
  body("lectureTitle")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  param("courseId").isMongoId().withMessage("Invalid course id"),
];
export const editLectureValidator = [
  param("lectureId").isMongoId().withMessage("Invalid lecture ID"),
  body("lectureTitle").optional().isString().isLength({ min: 1, max: 100 }),
  body("isPreviewFree").optional().isBoolean(),
];
