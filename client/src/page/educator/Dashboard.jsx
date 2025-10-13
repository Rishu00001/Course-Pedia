import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
const Dashboard = () => {
  const { userData } = useSelector((store) => store.user);
  const { creatorCourses } = useSelector((store) => store.course);
  
  const courseProgressData = creatorCourses?.map((course) => ({
    name: course.title.slice(0, 10) + (course.title.length > 10 ? "..." : ""),
    lectures: course.lectures.length || 0,
  })) || [];

  const enrollData = creatorCourses?.map((course) => ({
    name: course.title.slice(0, 10) + (course.title.length > 10 ? "..." : ""),
    students: course.enrolledStudents.length || 0,
  })) || [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Link to={"/"}>
        <FaArrowLeft
          className="absolute w-[22px] h-[22px] top-[5%] left-[5%]
        cursor-pointer text-gray-700 hover:w-[24px] hover:h-[24px] hover:text-gray-500"
        />
      </Link>
      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* main section */}
        <div
          className="max-w-5xl mx-auto bg-white rounded-xl p-6 flex flex-col
            md:flex-row items-center gap-6"
        >
          <img
            src={userData?.photoUrl || userData?.name.slice(0, 1).toUpperCase()}
            alt=""
            className="w-28 h-28 rounded-full object-cover border-2 border-black"
          />
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userData?.name || "Educator"}
            </h1>
            <h1 className="text-xl font-semibold text-gray-600">
              Total Earning : 0
            </h1>
            <Link to={"/courses"}>
              <h1
                className="px-[10px] text-center py-[10px] border-2 bg-black border-black
            text-white rounded-[10px] text-[15px] font-light flex items-center justify-center cursor-pointer mt-4"
              >
                Manage Courses
              </h1>
            </Link>
          </div>
        </div>

        {/* graph section */}
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
