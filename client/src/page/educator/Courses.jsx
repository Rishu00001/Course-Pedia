import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import img from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import useCreatorCourse from "../../hooks/getCreatorCourse";

const Courses = () => {
  const { creatorCourse } = useSelector((store) => store.course);
  useCreatorCourse();

  return (
    <div className="h-[100dvh] bg-gray-100 flex flex-col">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row justify-between
        items-start sm:items-center gap-3 p-4  bg-gray-100"
      >
        <div className="flex items-center justify-center gap-3">
          <Link to={"/dashboard"}>
            <FaArrowLeft className="w-[22px] h-[22px] cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold">Created Courses</h1>
        </div>
        <Link to={"/createcourse"}>
          <button
            className="px-5 py-2 bg-black text-white cursor-pointer
            rounded-md hover:bg-gray-800"
          >
            Create
          </button>
        </Link>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto hide-scrollBar p-4 space-y-4">
        {/* Desktop Table */}
        <div
          className="hidden md:block bg-gray-50 rounded-xl  p-4
          overflow-auto"
        >
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourse?.map((course, index) => (
                <tr
                  key={course._id || index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4 flex items-center gap-4">
                    <img
                      src={course.thumbnail || img}
                      alt=""
                      className="w-24 h-14 object-cover rounded-md"
                    />
                    <span>{course?.title || "No Title"}</span>
                  </td>
                  <td className="px-4 py-3">{course?.price || "NA"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs 
                        ${
                          course.isPublished
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {course?.isPublished ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/editcourse/${course._id}`}>
                      <FaEdit
                        className="text-gray-600 hover:text-blue-600 cursor-pointer"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-400 mt-6">
            Listed your recent courses
          </p>
        </div>

        {/* Mobile List */}
        <div className="md:hidden space-y-4">
          {creatorCourse?.map((course, index) => (
            <div
              key={course._id || index}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={course.thumbnail || img}
                  alt=""
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-medium text-sm">
                    {course?.title || "No Title"}
                  </h2>
                  <p className="text-gray-600 text-xs mt-1">
                    {course?.price || "NA"}
                  </p>
                </div>
                <Link to={`/editcourse/${course._id}`}>
                  <FaEdit className="text-gray-600 hover:text-blue-600 cursor-pointer" />
                </Link>
              </div>
              <span
                className={`w-fit px-3 py-1 text-xs rounded-full
                  ${
                    course?.isPublished
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {course?.isPublished ? "Live" : "Draft"}
              </span>
            </div>
          ))}
          <p className="text-center text-sm text-gray-400 mt-4">
            A list of your recent courses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
