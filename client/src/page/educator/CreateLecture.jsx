import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { server_url } from "../../App";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
const CreateLecture = () => {
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateLecture = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${server_url}/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(setLectureData([...lectureData, res.data.lecture])); //risky
      toast.success("Lecture added");
      setLectureTitle("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getCourseLectures = async () => {
    try {
      const res = await axios.get(
        `${server_url}/api/course/getcourselectures/${courseId}`,
        { withCredentials: true }
      );
      console.log(res.data.course.lectures);
      dispatch(setLectureData(res.data.course.lectures));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourseLectures();
  }, []);
  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center
    p-4"
    >
      <div className="bg-gray-100 w-full max-w-2xl p-6">
        <div className="mb-6">
          <h1
            className="text-2xl font-semibold text-gray-800
                mb-1"
          >
            Add a lecture
          </h1>
          <p className="text-sm text-gray-500">
            Enter the title and add your video lecture
          </p>
        </div>

        {/* input area */}
        <input
          onChange={(e) => setLectureTitle(e.target.value)}
          value={lectureTitle}
          type="text"
          placeholder="Title here"
          className="w-full border border-gray-300 rounded-md
        p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4"
        />

        {/* button */}
        <div className="flex gap-4 mb-6">
          <Link to={`/editcourse/${courseId}`}>
            <button
              className="flex items-center gap-2 px-4 py-2
                rounded-md bg-gray-200 hover:bg-gray-300 text-sm
                font-medium cursor-pointer tranition-all"
            >
              Back to course
            </button>
          </Link>
          <button
            onClick={handleCreateLecture}
            className="px-5 py-2 rounded-md bg-black text-white
                hover:bg-gray-600 transition-all text-sm font-medium cursor-pointer"
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Create Lecture"
            )}
          </button>
        </div>
        {/* lecture list */}
        <div className="space-y-2">
          {lectureData?.map((lecture, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-md flex justify-between
            items-center p-3 text-sm font-medium text-gray-700"
            >
              <span>
                Lecture - {index + 1} : {lecture.lectureTitle}
              </span>
              <Link to={`/editlecture/${courseId}/${lecture._id}`}>
                <FaEdit className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all duration-150" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
