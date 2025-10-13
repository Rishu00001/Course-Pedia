import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const EnrolledCourses = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  return (
    <div className="min-h-screen w-full px-4 py-9 bg-gray-50 relative">
      <FaArrowLeft
        onClick={() => navigate(-1)}
        className="absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer"
      />

      <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
        My Courses
      </h2>

      {userData?.enrolledCourses?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userData.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-4 rounded-xl   transition cursor-pointer"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-700">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {course.description.length > 60
                  ? course.description.substring(0, 57) + "..." 
                  : course.category}
              </p>
              <div className="flex justify-end">
                <button
                onClick={() => navigate(`/watch/${course._id}`)}
                 className="bg-gray-800 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-gray-700 mt-4">
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          You are not enrolled in any courses yet.
        </p>
      )}
    </div>
  );
};

export default EnrolledCourses;
