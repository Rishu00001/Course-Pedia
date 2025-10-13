import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { userData } = useSelector((store) => store.user);
  const { creatorCourse } = useSelector((store) => store.course);

  const courseProgressData =
    creatorCourse?.map((course) => ({
      name:
        course.title.slice(0, 10) + (course.title.length > 10 ? "..." : ""),
      lectures: course?.lectures?.length || 0,
    })) || [];

  const enrollData =
    creatorCourse?.map((course) => ({
      name:
        course.title.slice(0, 10) + (course.title.length > 10 ? "..." : ""),
      students: course?.enrolledStudents?.length || 0,
    })) || [];
   const totalEarnings = creatorCourse?.reduce((total, course) => total + (course.price || 0) * (course.enrolledStudents?.length || 0), 0) || 0;
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Back Button */}
      <Link to={"/"}>
        <FaArrowLeft
          className="absolute w-[22px] h-[22px] top-[5%] left-[5%]
        cursor-pointer text-gray-700 hover:w-[24px] hover:h-[24px] hover:text-gray-500"
        />
      </Link>

      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* User Section */}
        <div
          className="max-w-5xl mx-auto bg-white rounded-xl p-6 flex flex-col
            md:flex-row items-center gap-6"
        >
          {userData?.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt={`Avatar of ${userData?.name}`}
              className="w-28 h-28 rounded-full object-cover border-2 border-black"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300 text-black flex items-center justify-center text-3xl font-bold border-2 border-black">
              {userData?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}

          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userData?.name || "Educator"}
            </h1>
            <h1 className="text-xl font-semibold text-gray-600">
              Total Earning : {totalEarnings} INR
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

        {/* Charts Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress Chart */}
          <div className="bg-white p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Course Progress
            </h2>
            {courseProgressData.length === 0 ? (
              <p className="text-gray-500 text-center">No course data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={courseProgressData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="lectures" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Enrollment Chart */}
          <div className="bg-white p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enrolled Students
            </h2>
            {enrollData.length === 0 ? (
              <p className="text-gray-500 text-center">No enrollment data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={enrollData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
