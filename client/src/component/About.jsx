import React from "react";
import aboutImg from "../assets/about.jpg";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const About = () => {
  return (
    <div
      className="w-[100vw] lg:h-[70vh] min-h-[70vh] flex flex-wrap
    items-center justify-center gap-2 mb-[30px]"
    >
      {/* for image */}
      <div
        className="lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex
        items-center justify-center relative"
      >
        <img
          src={aboutImg}
          alt=""
          className="w-[80%] h-[90%]
            rounded-lg"
        />
      </div>
      {/* for text */}

      <div
        className="lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex items-start
        justify-center flex-col px-[35px] md:px-[80px]"
      >
        <div className="flex text-[20px] items-center justify-center gap-[20px]">
          About Us
          <TfiLayoutLineSolid className="w-[40px] h-[40px]" />
        </div>
        <div className="md:text-[45px] text-[35px] font-semibold">
          We  Accelerate your learning growth.
        </div>
        <div className="text-[15px]">
          We are providing a modern AI-Powered Learning Platform to simplify
          online education and enhance the student-educator collaboration
          experience.
        </div>

        <div className="w-[100%] lg:w-[100%]">
          <div className="flex items-center justify-between mt-[40px]">
            <div className="flex items-center justify-center gap-[10px]">
              <IoMdCheckmarkCircleOutline className="w-[20px] h-[20px]" />{" "}
              Simplified Learning
            </div>
            <div className="flex items-center justify-center gap-[10px]">
              <IoMdCheckmarkCircleOutline className="w-[20px] h-[20px]" />{" "}
              Simplified Learning
            </div>
          </div>
          <div className="flex items-center justify-between mt-[40px]">
            <div className="flex items-center justify-start gap-[10px]">
              <IoMdCheckmarkCircleOutline className="w-[20px] h-[20px]" />{" "}
              Verified Educators
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              <IoMdCheckmarkCircleOutline className="w-[20px] h-[20px]" />{" "}
              Life-Time Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
