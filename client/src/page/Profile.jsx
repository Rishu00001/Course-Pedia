import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate()
  const { userData } = useSelector((store) => store.user);
  return (
    <div className="min-h-screen px-4 md:py-10 flex items-center justify-center">
      <div className="rounded-2xl p-8 max-w-xl w-full relative">
        <div className="flex flex-col items-center text-center">
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              alt=""
              className="w-24 h-24 rounded-full
        object-cover border-4 border-black"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full
        object-cover border-2 border-white text-white text-[30px] flex items-center
        justify-center bg-black"
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {userData?.name}
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            {userData?.role}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="text-sm flex items-center justify-start gap-1">
            <span className="font-semibold text-gray-700">Email:</span>
            <span>{userData?.email}</span>
          </div>
          <div className="text-sm flex items-center justify-start gap-1">
            <span className="font-semibold text-gray-700">Bio:</span>
            <span>{userData?.bio}</span>
          </div>
          <div className="text-sm flex items-center justify-start gap-1">
            <span className="font-semibold text-gray-700">Courses:</span>
            <span>{userData?.enrolledCourses?.length}</span>
          </div>
        </div>
        <div className=" flex justify-center items-center top-2 right-2">
          <button
            onClick={() => navigate("/editprofile")}
            className="px-4 py-2 rounded bg-black text-white active:bg-[#4b4b4b] cursor-pointer transition mt-2 "
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
