import Course from "../model/courseModel.js";
import Review from "../model/reviewModel.js";

export const createReview = async (req, res) => {
  try {
    const { rating, comment, courseId } = req.body;
    const userId = req.userId;

    // Validate input
    if (!rating || !comment || !courseId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }
    if (comment.length > 500) {
      return res
        .status(400)
        .json({ message: "Comment cannot exceed 500 characters" });
    }
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    //check if user has already reviewed the course
    const existingReview = await Review.findOne({
      course: courseId,
      user: userId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this course" });
    }
    // Create new review
    const newReview = new Review({
      course: courseId,
      user: userId,
      rating,
      comment,
    });
    await newReview.save();
    await courseExists.reviews.push(newReview._id);
    await courseExists.save();
    return res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}, "rating comment courseId createdAt")
      .populate("user", "name photoUrl role")
      .sort({ createdAt: -1 });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
};



