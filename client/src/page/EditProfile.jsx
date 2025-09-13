import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server_url } from "../App";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store.user);

  const [name, setName] = useState(userData?.name || "");
  const [description, setDescription] = useState(userData?.bio || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", description);
      if (photoUrl) {
        formData.append("photoUrl", photoUrl); // 👈 key matches backend multer.single("photoUrl")
      }

      const res = await axios.post(
        `${server_url}/api/user/profile`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(res.data);

      // update redux state immediately
      dispatch(setUserData(res.data));
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl p-8 max-w-xl w-full relative">
        <FaArrowLeft
          className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-2xl text-center font-bold mb-6">Edit Profile</h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Avatar Preview */}
          <div className="flex flex-col items-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-black"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-2 border-white text-white text-[30px] flex items-center justify-center bg-black">
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          {/* Upload input */}
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Select Avatar
            </label>
            <input
              onChange={(e) => setPhotoUrl(e.target.files[0])}
              type="file"
              id="image"
              name="photoUrl"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
              name="name"
              placeholder={userData?.name}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email id
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={userData?.email}
              className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm"
              disabled
            />
          </div>

          {/* About */}
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              About
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              name="description"
              rows={3}
              placeholder={userData?.bio || "Tell about yourself"}
              className="w-full px-4 py-2 border rounded-md text-sm mt-1 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handlEditProfile}
            disabled={loading}
            className="w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
