import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { server_url } from "../App";
import { FaArrowLeft } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
const WatchLecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures[0] || null
  );
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
      {/* left area */}
      <div
        className="w-full md:w-2/3 bg-white rounded-2xl  p-6 border
      border-gray-200"
      >
        <div className="mb-6">
          <h2
            className="text-2xl font-bold flex items-center
            justify-start gap-[20px] text-gray-800"
          >
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="cursor-pointer text-black w-[22px] h-[22px]"
            />
            {selectedCourse?.title}
          </h2>
          <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
            <span>Catagory : {selectedCourse?.category}</span>
            <span>Level : {selectedCourse?.level}</span>
          </div>
        </div>
        {/* // video area */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          {selectedLecture?.videoUrl ? (
            <video
              controls
              src={selectedLecture?.videoUrl}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              No Lecture Available
            </div>
          )}
        </div>
        <div className="mt-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedLecture?.lectureTitle}
          </h2>
        </div>
      </div>

      {/* right area */}
      <div className="w-full md:w-1/3 flex flex-col p-6 bg-white rounded-2xl h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Lectures</h2>
        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => (
              <button
                className= {`flex items-center justify-start gap-6 p-3 rounded-lg border transition-all
                    text-left ${selectedLecture?._id === lecture._id
                    ? "bg-gray-200 border-gray-500"
                    : "bg-gray-100 border-transparent hover:bg-gray-300"
                  }`}
              onClick={()=>setSelectedLecture(lecture)} key={lecture._id}>
               <FaPlay className="text-gray-800"/> <h2 className="text-sm font-semibold font-gray-800">{lecture.lectureTitle}</h2>
              </button>
            ))
          ) : (
            <div className="text-gray-500">No Lecture Available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchLecture;
