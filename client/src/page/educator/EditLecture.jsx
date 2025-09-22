import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server_url } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
const EditLecture = () => {
  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();
  const { lectureData } = useSelector((store) => store.lecture);
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId
  );
  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture?.lectureTitle || ""
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIspreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();
  console.log("Here", selectedLecture);
  const formData = new FormData();
  formData.append("lectureTitle", lectureTitle);
  formData.append("videoUrl", videoUrl);
  formData.append("isPreviewFree", isPreviewFree);

  const handleEditLecture = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${server_url}/api/course/editlecture/${lectureId}`,
        formData,
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(setLectureData([...lectureData, res.data.lecture]));
      toast.success("Lecture Updated");
      navigate("/courses");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center
    justify-center p-4"
    >
      <div className="w-full max-w-xl bg-gray-100 p-6 space-y-6">
        {/* header */}
        <div className="flex items-center gap-2 mb-2">
          <Link to={`/createlecture/${courseId}`}>
            <FaArrowLeft size={25} className="text-gray-600 cursor-pointer" />
          </Link>
          <h2 className="text-xl font-semibold text-gray-800">
            Update Course Lecture
          </h2>
        </div>
        <button
          className="mt-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700
        transition-all cursor-pointer tracking-normal"
        >
          Remove Lecture
        </button>

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700
                mb-1"
              htmlFor=""
            >
              Lecture Title
            </label>
            <input
              onChange={(e) => setLectureTitle(e.target.value)}
              value={lectureTitle}
              type="text"
              className="w-full p-3 border border-gray-300
            rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none
            required"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700
                mb-1"
              htmlFor=""
            >
              {" "}
              Lecture Video
            </label>
            <input
              onChange={(e) => setVideoUrl(e.target.files[0])}
              type="file"
              className="w-full border border-gray-300
            rounded-md p-2 file:px-4 file:py-2 file:rounded-md file:border-0
            file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-500"
              required
              accept="video/*"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="accent-black"
              id="isFree"
              onChange={() => setIspreviewFree((prev) => !prev)}
            />
            <label htmlFor="isFree" className="text-sm text-gray-700">
              Free Preview
            </label>
          </div>
          {loading ? "uploading...." : ""}
        </div>
        <div className="pt-4">
          <button
            onClick={handleEditLecture}
            className="w-full bg-black text-white py-3 rounded-md
                text-small font-medium hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Update Lecture"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
