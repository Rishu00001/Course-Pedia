import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircle, IoTrophy } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server_url } from "../App";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  //logout function
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${server_url}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-[60px] fixed top-0 left-0 z-10 bg-[#00000047] backdrop-blur-md shadow">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Fudemy Logo"
            className="w-[50px] rounded-md border-2 border-white cursor-pointer"
          />
        </div>

        {/* Right: Dashboard + Profile */}
        <div className="lg:flex items-center gap-6 hidden">
          {/* Dashboard Button */}
          {userData && userData?.role == "educator" && (
            <Link to={"/dashboard"}>
              <div
                className="px-5 py-2 border-2 border-white text-white bg-black rounded-[10px]
            text-[14px] font-light cursor-pointer hover:scale-105 transition"
              >
                Dashboard
              </div>
            </Link>
          )}

          {/* Profile Icon + Dropdown */}
          {userData ? (
            <div className="relative">
              <div
                className="w-[45px] h-[45px] fill-black cursor-pointer hover:scale-105 transition rounded-full text-white flex items-center
              justify-center text-[16px] border-2 bg-black border-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {userData?.photoUrl ? (
                  <img
                    src={userData?.photoUrl}
                    alt=""
                    className="object-cover rounded-full"
                  />
                ) : (
                  userData?.name?.slice(0, 1).toUpperCase()
                )}
              </div>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-black text-white 
                border border-white rounded-lg shadow-lg z-20 flex flex-col"
                >
                  <Link to={"/profile"}>
                    <button className="px-4 py-2 hover:bg-gray-700  rounded-t-lg text-left">
                      Profile
                    </button>
                  </Link>
                  <button className="px-4 py-2 hover:bg-gray-700  rounded-t-lg text-left">
                    My Courses
                  </button>
                  <button
                    className="px-4 py-2 hover:bg-gray-700  rounded-b-lg text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/login"}>
              <span
                className="px-5 py-[8px] border-2 border-white text-white
          rounded-[10px] text-[14px] font-light cursor-pointer bg-[#000000d5]"
              >
                Login
              </span>
            </Link>
          )}
        </div>
        {!showSlider && (
          <RxHamburgerMenu
            className="w-[30px] h-[30px] lg:hidden fill-white cursor-pointer text-gray-200"
            onClick={() => {
              setShowSlider(!showSlider);
            }}
          />
        )}

        <div
          className={`fixed top-0 w-[100vw] h-[100vh] bg-[#000000d6] flex
        items-center justify-center flex-col gap-5 z-10 lg:hidden left-0 ${
          showSlider
            ? "translate-x-[0] transition duration-300"
            : "translate-x-[-100%] transition duration-300"
        }`}
        >
          {/* slider */}
          <RxCross2
            onClick={() => setShowSlider(!showSlider)}
            className="w-[30px] h-[30px] fill-white absolute top-5 right-[4%] text-gray-400 cursor-pointer"
          />

          {userData ? (
            <div className="flex flex-col items-center mt-20">
              <div className="w-[70px] h-[70px] rounded-full bg-white text-black flex items-center justify-center text-2xl font-semibold border-2 border-white">
                {userData?.photoUrl ? (
                  <img
                    src={userData?.photoUrl}
                    alt=""
                    className="rounded-full"
                  />
                ) : (
                  userData?.name?.slice(0, 1).toUpperCase()
                )}
              </div>
              <p className="mt-3 text-white text-lg font-medium">
                {userData?.name}
              </p>
            </div>
          ) : (
            <Link to={"/login"} onClick={() => setShowSlider(false)}>
              <span
                className="mt-20 px-5 py-[8px] border-2 border-white text-white
        rounded-[10px] text-[14px] font-light cursor-pointer bg-[#000000d5]"
              >
                Login
              </span>
            </Link>
          )}

          {/* Menu Options */}
          {userData && (
            <div className="flex flex-col gap-4 mt-5 text-white text-center text-lg">
              <Link to={"/profile"}>
                <button className="py-2 border-b border-gray-600">
                  Go to Profile
                </button>
              </Link>
              {userData?.role === "educator" && (
                <button className="py-2 border-b border-gray-600">
                  Dashboard
                </button>
              )}
              <button className="py-2 border-b border-gray-600">
                My Courses
              </button>
              <button className="py-2 border-b border-gray-600">Contact</button>
              <button
                className="py-2 border-b border-gray-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
