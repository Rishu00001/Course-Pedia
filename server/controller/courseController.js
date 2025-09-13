import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../model/courseModel.js";

import Joi from "joi";

const courseSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  category: Joi.string().alphanum().min(3).max(50).required(),
});

export const createCourse = async (req, res) => {
  try {
    if (req.role !== "educator") {
      return res
        .status(403)
        .json({ message: "Not authorized to create courses" });
    }

    const { error, value } = courseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { title, category, description } = value;

    const existing = await Course.findOne({ title, creator: req.userId });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Course with this title already exists" });
    }
    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });

    return res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error.message);
    return res.status(500).json({ message: "Error while creating course" });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });

    if (courses.length == 0) {
      return res.status(404).json({ message: "Courses not found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error finding course:", error.message);
    return res.status(500).json({ message: "Error while finding course" });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.role;
    if (role != "educator") {
      return res.status(403).json({ message: "access denied" });
    }

    const courses = await Course.find({ creator: userId });

    if (courses.length == 0) {
      return res.status(404).json({ message: "courses not found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error finding creator course:", error.message);
    return res
      .status(500)
      .json({ message: "Error while finding creator course" });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
    } = req.body;
    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
      thumbnail,
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Error while editing the course" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course is not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the course by id" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error while deleting the course", error: error.message });
  }
};

