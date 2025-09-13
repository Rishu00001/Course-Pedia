import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { server_url } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import useCreatorCourse from "../../hooks/getCreatorCourse";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${server_url}/api/course/createcourse`,
        {
          title,
          category,
        },
        { withCredentials: true }
      );
      console.log(res?.data);
      toast.success("Course created");
      navigate("/courses")
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center
    bg-gray-100 px-4 py-10"
    >
      <div
        className="max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md
      rounded-md mt-10 relative"
      >
        <Link to={"/courses"}>
          <FaArrowLeft
            className="absolute w-[22px] h-[22px] top-[8%] left-[5%]
        cursor-pointer text-gray-700 hover:w-[24px] hover:h-[24px] hover:text-gray-500"
          />
        </Link>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Course
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="title"
            >
              Course Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              id="title"
              placeholder="Course title"
              className="w-full border border-gray-300 rounded-md px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="cat"
            >
              Course Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              id="cat"
              className="w-full border border-gray-300 rounded-md px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Category</option>
              <option value="App Development">App Development</option>
              <option value="Web Development">Web Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="DSA">DSA</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            className="w-full bg-black text-white py-2 px-4
          rounded-md hover:bg-gray-800 transition duration-200"
            onClick={handleCreateCourse}
            disabled = {loading}
          >
            {loading ? <ClipLoader/>: "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
