import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../model/courseModel.js";

import Joi from "joi";
import Lecture from "../model/lectureModel.js";
import User from "../model/userModel.js";

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
    const courses = await Course.find({ isPublished: true }).populate(
      "lectures reviews"
    );

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
    const { title, subTitle, description, category, level, isPublished, price } = req.body;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Convert to proper boolean
    const publishStatus = isPublished === "true" || isPublished === true;
    const unpublishStatus = isPublished === "false" || isPublished === false;

    // Validation only when publishing
    if (publishStatus) {
      if (!title && !course.title) return res.status(403).json({ message: "Title is required" });
      if (!description && !course.description) return res.status(403).json({ message: "Description is required" });
      if (!category && !course.category) return res.status(403).json({ message: "Category is required" });
      if (!level && !course.level) return res.status(403).json({ message: "Level is required" });
      if (!price && !course.price) return res.status(403).json({ message: "Price is required" });
    }

    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (subTitle) updateData.subTitle = subTitle;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (level) updateData.level = level;
    if (price) updateData.price = price;
    if (thumbnail) updateData.thumbnail = thumbnail;
    if (publishStatus || unpublishStatus) updateData.isPublished = publishStatus;

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
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
    return res.status(500).json({
      message: "Error while deleting the course",
      error: error.message,
    });
  }
};

//for Lectures:

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    const role = req.role;

    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    if (course.creator != req.userId) {
      return res.status(400).json({ message: "unauthorized" });
    }
    course.lectures.push(lecture._id);
    await course.populate("lectures");
    await course.save();
    return res
      .status(201)
      .json({ message: "Lecture created successfully", lecture, course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error while creating lecture", error });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params; //isko validate krna hai

    // Fetch course and populate lectures in one go
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res
      .status(200)
      .json({ message: "Course found succesfully", course });
  } catch (error) {
    console.error("Error in getCourseLecture:", error);
    return res.status(500).json({ message: "Failed to get course lectures" });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;

    // Lecture exists?
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Ownership check
    const course = await Course.findOne({
      lectures: lectureId,
      creator: req.userId,
    });
    if (!course) {
      return res
        .status(403)
        .json({ message: "Not allowed to edit this lecture" });
    }

    // File upload (optional)
    if (req.file) {
      try {
        const videoUrl = await uploadOnCloudinary(req.file.path);
        lecture.videoUrl = videoUrl;
      } catch (uploadErr) {
        return res.status(500).json({ message: "Video upload failed" });
      }
    }

    // Partial updates
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    if (typeof isPreviewFree !== "undefined") {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    return res.status(200).json({
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    console.error("Edit Lecture Error:", error);
    return res.status(500).json({ message: "Failed to edit lecture" });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    // Check ownership
    const course = await Course.findOne({
      lectures: lectureId,
      creator: req.userId,
    });

    if (!course) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Remove lecture reference from course first
    const updatedCourse = await Course.findByIdAndUpdate(
      course._id,
      { $pull: { lectures: lectureId } },
      { new: true }
    );

    // Then delete lecture document
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    return res.status(200).json({
      message: "Lecture deleted successfully",
      lecture,
      course: updatedCourse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while deleting lecture", error });
  }
};

export const getCreatorById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding user by id", error });
  }
};
