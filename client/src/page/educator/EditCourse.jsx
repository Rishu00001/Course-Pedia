import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import thumbImg from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { server_url } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";
const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((store) => store.course);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [des, setDes] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(thumbImg);
  const [backendThumbnail, setBackendThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const thumb = useRef();
  // handle file change
  const handleThumbChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
      setBackendThumbnail(file);
    }
  };

  const getCourseById = async () => {
    try {
      const res = await axios.get(
        `${server_url}/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );
      console.log(res?.data);
      setSelectedCourse(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", des);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendThumbnail);
    formData.append("isPublished", isPublished);
    try {
      const res = await axios.post(
        `${server_url}/api/course/editcourse/${courseId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res?.data);
      const updateData = res?.data;
      if (updateData?.isPublished) {
        const updateCourses = courseData?.map((c) =>
          c._id == courseId ? updateData : c
        );
        if (!courseData.some((c) => c._id === courseId)) {
          updateCourses.push(updateData);
        }
        dispatch(setCourseData(updateCourses));
      } else {
        const filterCourse = courseData.filter((c) => c._id != courseId);
        dispatch(setCourseData(filterCourse));
      }
      toast.success("Course updated");
      navigate("/courses");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async () => {
    try {
      setRemoving(true);
      const res = await axios.delete(
        `${server_url}/api/course/remove/${courseId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res?.data);
      const filterCourse = courseData.filter((c) => c._id != courseId);
      dispatch(setCourseData(filterCourse));
      toast.success("Course deleted permanently");
      navigate("/courses");
    } catch (error) {
      log(error);
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse?.title || "");
      setCategory(selectedCourse.category || "");
      setSubTitle(selectedCourse?.subTitle || "");
      setDes(selectedCourse?.description || "");
      setLevel(selectedCourse?.level || "");
      setPrice(selectedCourse?.price || "");
      setThumbnail(selectedCourse?.thumbnail || thumbImg);
      setIsPublished(selectedCourse?.isPublished);
    }
  }, [selectedCourse]);
  useEffect(() => {
    getCourseById();
  }, []);
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg">
      {/* top bar */}
      <div
        className="flex items-center gap-[20px]
        md:justify-between flex-col md:flex-row mb-6 relative"
      >
        <Link to={"/courses"} className="flex items-center w-full md:w-auto">
          <FaArrowLeft
            className="absolute w-[22px] h-[22px] top-[-30%] md:top-[20%] left-[0%]
            md:left-[2%] cursor-pointer text-gray-700 hover:w-[24px] hover:h-[24px] hover:text-gray-500"
          />
          <h2 className="text-2xl font-semibold md:pl-[60px]">
            Add your course details
          </h2>
        </Link>

        <div className="space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Go to Lecture Page
          </button>
        </div>
      </div>

      {/* form */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Information</h2>

        <div className="space-x-2 space-y-2">
          {!isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2
              rounded-md border cursor-pointer"
              onClick={() => setIsPublished(true)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-red-100 text-red-600 px-4 py-2
              rounded-md border cursor-pointer"
              onClick={() => setIsPublished(false)}
            >
              Click to Unpublish
            </button>
          )}

          <button
            onClick={removeCourse}
            className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            {removing ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Remove Course"
            )}
          </button>
        </div>

        <form className="space-y-6 mt-2" onSubmit={(e) => e.preventDefault()}>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              className="w-full border px-4 py-2 rounded-md border-gray-400"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label
              htmlFor="subTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subtitle
            </label>
            <input
              className="w-full border px-4 py-2 rounded-md border-gray-400"
              type="text"
              id="subTitle"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="des"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course description
            </label>
            <textarea
              className="w-full border px-4 py-2 rounded-md border-gray-400
              h-24 resize-none"
              id="des"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
          </div>

          {/* Category, Level, Price */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* Category */}
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                id="category"
                className="w-full border px-4 py-2 rounded-md bg-white"
              >
                <option value="">Select Category</option>
                <option value="App Development">App Development</option>
                <option value="Web Development">Web Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="DSA">DSA</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Difficulty Level */}
            <div className="flex-1">
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Difficulty level
              </label>
              <select
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                id="level"
                className="w-full border px-4 py-2 rounded-md bg-white"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                id="price"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="INR"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              hidden
              ref={thumb}
              accept="image/*"
              onChange={handleThumbChange}
            />
            <div className="relative w-[300px] h-[170px]">
              <img
                src={thumbnail}
                alt="thumbnail"
                className="w-full h-full border border-black cursor-pointer object-cover rounded-md"
                onClick={() => thumb.current.click()}
              />
              <FaEdit className="absolute top-1 right-1 w-[18px] h-[18px] cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-[15px]">
            <button
              className="bg-[#e9e8e8] hover:bg-red-200 text-black border-1
            border-black cursor-pointer px-4 py-2 rounded-md"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>

            <button
              onClick={editCourse}
              className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer"
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
