import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import emptyImg from "../assets/empty.jpg";
import { FaStar } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { server_url } from "../App";
import axios from "axios";
import CourseCard from "../component/CourseCard";
import { toast } from "react-toastify";
import { calculateAverageRating } from "../utils/averageRating";
const ViewCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const courseData = useSelector((store) => store.course.courseData);
  const selectedCourse = useSelector((store) => store.course.selectedCourse);
  const userData = useSelector((store) => store.user.userData);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatoerCourses, setCreatorCourses] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCourse = async () => {
    const course = courseData?.find((course) => course._id === courseId);
    dispatch(setSelectedCourse(course));
  };
  useEffect(() => {
    if (courseData && courseData.length > 0) {
      fetchCourse();
    }
  }, [courseId, courseData]);

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const res = await axios.get(
            `${server_url}/api/course/getcreator/${selectedCourse.creator}`,
            { withCredentials: true }
          );
          setCreatorData(res.data);
          console.log("This is creator", res.data);
        } catch (error) {
          console.log("Error fetching creator data:", error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);
  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourses = courseData.filter(
        (course) =>
          course.creator === creatorData._id &&
          course._id !== selectedCourse._id
      );
      setCreatorCourses(creatorCourses);
      checkEnrolled();
    }
  }, [creatorData, courseData, selectedCourse]);

  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(
        `${server_url}/api/order/createorder`,
        { userId, courseId },
        { withCredentials: true }
      );
      console.log("Order data:", orderData.data);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.order.amount,
        currency: "INR",
        name: "LMS",
        description: "Course Purchase",
        order_id: orderData.data.order.id,
        handler: async function (response) {
          console.log("Payment response:", response);
          try {
            const verifyPayment = await axios.post(
              `${server_url}/api/order/verifypayment`,
              {
                courseId,
                userId,
                razorpay_order_id: response.razorpay_order_id,
              },
              { withCredentials: true }
            );
            checkEnrolled();
            toast.success("Payment successful and course enrolled");
          } catch (error) {
            log("Error verifying payment:", error);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };
  const checkEnrolled = () => {
    const verify = userData?.enrolledCourses.find(
      (course) => course._id.toString() === selectedCourse._id.toString()
    );
    if (verify) {
      setIsEnrolled(true);
    }
  };
  const handleReview = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${server_url}/api/review/createreview`,
        {
          courseId: selectedCourse._id,
          userId: userData._id,
          rating,
          comment,
        },
        { withCredentials: true }
      );
      console.log("Review response", res.data);
      toast.success("Review submitted successfully");
    } catch (error) {
      console.log("Error submitting review", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
      setComment("");
      setRating(0);
    }
  };
 
  const {average,reviewsLength} = calculateAverageRating(selectedCourse?.reviews);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-gray-50 rounded-xl p-6 space-y-6 relative">
        {/* top section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* thumbnail */}
          <div className="w-full md:w-1/2">
            <Link to={"/"}>
              <FaArrowLeft className="text-black w-[22px] h-[22px] cursor-pointer"/>
            </Link>
            {selectedCourse?.thumbnail ? (
              <img
                src={selectedCourse?.thumbnail}
                alt=""
                className="rounded-xl w-full h-full object-cover w-"
              />
            ) : (
              <img src={emptyImg} alt="" />
            )}
          </div>

          {/* course info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h2 className="text-2xl font-bold">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle || ""}</p>
            <div className="flex items-start flex-col justify-between">
              <div className="text-yellow-500 font-medium flex gap-2">
                <span className="flex items-center justify-start gap-1">
                  {" "}
                  <FaStar /> {average}
                </span>
                <span className="text-gray-400">({`${reviewsLength}`} Reviews)</span>
              </div>
              <div>
                <span className="text-xl font-semibold text-black">
                  {selectedCourse?.price || "₹00"}
                </span>{" "}
                <span className="line-through text-sm text-gray-400">₹599</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1 pt-2">
                <li>10+ hours of content</li>
                <li>Lifetime access</li>
                <li>Certificate after completion</li>
                <li></li>
              </ul>
              {userData && !isEnrolled ? (
                <button
                  onClick={() => handleEnroll(userData._id, selectedCourse._id)}
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700
              mt-3 cursor-pointer transition-colors duration-75"
                >
                  Enroll
                </button>
              ) : (
                <Link to={`/watch/${selectedCourse?._id}`}>
                  <button
                    className="bg-green-100 text-green-500 px-6 py-2 rounded hover:bg-gray-700
              mt-3 cursor-pointer transition-colors duration-75"
                  >
                    Watch Now
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* course description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">What you'll learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse?.category} from begining</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Who this course is for</h2>
          <p className="text-gray-700">
            This course is perfect for beginners looking to start their journey
            in {selectedCourse?.category} and anyone interested in enhancing
            their skills in this field.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div
            className="bg-white w-full md:w-2/5 p-6 rounded-2xl  border
          border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-1">Course Content</h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedCourse?.lectures?.length || 0} Lectures
            </p>
            <div className="flex flex-col gap-3">
              {selectedCourse?.lectures.map((lecture) => (
                <button
                  disabled={!lecture.isPreviewFree}
                  onClick={() => {
                    if (lecture.isPreviewFree) {
                      setSelectedLecture(lecture);
                    }
                  }}
                  key={lecture._id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border 
                transition-all duration-200 text-left ${
                  lecture.isPreviewFree
                    ? "hover:bg-gray-100 cursor-pointer"
                    : "cursor-not-allowed bg-gray-50 border-gray-200"
                } ${
                    selectedLecture?.lectureTitle === lecture.lectureTitle
                      ? "bg-gray-100 border-gray-400"
                      : ""
                  }`}
                >
                  <span className="text-lg text-gray-700">
                    {lecture.isPreviewFree ? <FaPlay /> : <FaLock />}
                  </span>
                  <span className="text-small font-medium text-gray-800">
                    {lecture.lectureTitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            className="bg-white w-full md:w-3/5 p-6 rounded-2xl
          border border-gray-200"
          >
            <div
              className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black
            flex items-center justify-center"
            >
              {selectedLecture?.videoUrl ? (
                <video
                  controls
                  className="w-full h-full object-cover"
                  src={selectedLecture.videoUrl}
                />
              ) : (
                <span className="text-white text-sm">
                  {" "}
                  Select a lecture to preview
                </span>
              )}
            </div>
          </div>
        </div>

        {/* reviews section */}
        <div className="mt-8 border-t border-gray-600 pt-6">
          <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  onClick={() => setRating(star)}
                  key={star}
                  className={
                    star <= rating
                      ? "text-yellow-500 cursor-pointer"
                      : "text-gray-300 cursor-pointer"
                  }
                  size={30}
                />
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className=" mt-1 w-full p-3 border border-gray-300 rounded-md
            focus:outline-none focus:border-none focus:ring-2 focus:ring-gray-200  resize-none"
              placeholder="Write your review here..."
            />
            <button
              onClick={handleReview}
              className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
        {/* more from creator */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-600">
          {creatorData?.photoUrl ? (
            <img
              src={creatorData.photoUrl}
              alt=""
              className="border-1 border-gray-300 w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <img
              src={emptyImg}
              alt=""
              className=" border-1 border-gray-300 w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold">{creatorData?.name}</h2>
            <p className="text-sm text-gray-500">{creatorData?.email}</p>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {creatorData?.bio}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xl font-semibold mb-2 text-gray-800">
            More courses from the instructor -
          </p>
          <div
            className="w-full transition-all duration-300 py-[20px] flex flex-wrap
          items-start justify-center lg:justify-start gap-6 lg:px-[80]"
          >
            {creatoerCourses &&
              creatoerCourses.length > 0 &&
              creatoerCourses.map((course, index) => (
                <CourseCard {...course} key={course._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
