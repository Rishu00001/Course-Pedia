import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 py-10 px-6">
      <div
        className="max-w-7xl mx-auto flex lg:items-center items-start justify-center
      gap-[40px] lg:gap-[150px] flex-col lg:flex-row"
      >
        <div className="lg:w-[40%] md:w-[50%] w-[100%]">
          <img src={logo} alt="" className="h-10 mb-3 border-1 rounded-[5px]" />
          <h2 className="text-xl font-bold text-white mb-3">CoursePedia</h2>
          <p className="text-sm">
            AI-Powered learning platfrom to help you grow smarter. Learn
            anywhere, anytime with our expert-led courses and personalized
            learning paths.
          </p>
        </div>

        <div className="lg:w-[30%] md:w-[100%]">
          <div className="text-white font-semibold mb-2">Quick Links</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              {" "}
              <Link to={"/login"}>Login</Link>{" "}
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to={"/"} >Home</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to={"/allcourses"}>Courses</Link>
            </li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

                <div className="lg:w-[30%] md:w-[100%]">
          <div className="text-white font-semibold mb-2">Categories</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              Web Development
            </li>
            <li className="hover:text-white cursor-pointer">
              Data Science
            </li>
            <li className="hover:text-white cursor-pointer">
              DSA
            </li>
            <li className="hover:text-white cursor-pointer">Cyber Security</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-10 pt-5 text-sm text-center
      text-gray-500">
        &copy; {new Date().getFullYear()} CoursePedia. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
