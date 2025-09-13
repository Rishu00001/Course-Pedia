import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa";
import { MdAppShortcut } from "react-icons/md";
import { SiHackaday } from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { SiAlwaysdata } from "react-icons/si";
import { GiServerRack } from "react-icons/gi";
import { SiGoogledataproc } from "react-icons/si";
import { Link } from "react-router-dom";
const Explore = () => {
  return (
    <div
      className="w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col
    lg:flex-row items-center justify-center gap-4 px-[30px] pt-[60px] lg:pb-[120px]
    lg:mt-[100px]"
    >
      <div
        className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px]
        flex flex-col items-start justify-center gap-1
        md:px-[40px] px-[20px]"
      >
        <span className="text-[35px] font-semibold">Explore</span>
        <span className="text-[35px] font-semibold">Our Courses</span>
        <p className="text-[17px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, dicta
          mollitia? Quidem voluptates atque maiores odit optio exercitationem?
        </p>
        <Link to={"/allcourses"}>
          <button
            className="px-[20px] py-[10px] border-2 bg-black border-white
        text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[30px]
        cursor-pointer justify-center items-center"
          >
            Explore Courses{" "}
            <SiViaplay className="w-[30px] h-[30px] fill-white" />
          </button>
        </Link>
      </div>

      <div
        className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex
      items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px]
      lg:mb-[0px] lg:px-[80px]"
      >
        <div
          className="w-[90px] h-[120px] font-light text-[13px]
            flex flex-col gap-3 text-center"
        >
          <div
            className="w-[80px] h-[70px] bg-[#fbd9fb]
                rounded-lg flex items-center justify-center"
          >
            <TbDeviceDesktopAnalytics className="w-[40px] h-[40px] text-[#6d6c6c]" />
          </div>
          Web Dev
        </div>
        <div
          className="w-[90px] h-[120px] font-light text-[13px]
            flex flex-col gap-3 text-center"
        >
          <div
            className="w-[80px] h-[70px] bg-[#d9fbe0]
                rounded-lg flex items-center justify-center"
          >
            <FaUikit className="w-[40px] h-[40px] text-[#6c6d6c]" />
          </div>
          UI/UX
        </div>
        <div
          className="w-[90px] h-[120px] font-light text-[13px]
            flex flex-col gap-3 text-center"
        >
          <div
            className="w-[80px] h-[70px] bg-pink-100
                rounded-lg flex items-center justify-center"
          >
            <MdAppShortcut className="w-[40px] h-[40px] text-[#6d6c6c]" />
          </div>
          App Dev
        </div>
        <div
          className="w-[90px] h-[120px] font-light text-[13px]
            flex flex-col gap-3 text-center"
        >
          <div
            className="w-[80px] h-[70px] bg-[#fbd9fb]
                rounded-lg flex items-center justify-center"
          >
            <SiHackaday className="w-[40px] h-[40px] text-[#6d6c6c]" />
          </div>
          Ethical Hacking
        </div>
        <div
          className="w-[90px] h-[120px] font-light text-[13px]
            flex flex-col gap-3 text-center"
        >
          <div
            className="w-[80px] h-[70px] bg-[#d9fbe0]
                rounded-lg flex items-center justify-center"
          >
            <GiArtificialIntelligence className="w-[40px] h-[40px] text-[#6d6c6c]" />
          </div>
          AI/ML
        </div>
        <div
          className="w-[90px] h-[120px] font-light text-[13px]
            flex flex-col gap-3 text-center"
        >
          <div
            className="w-[80px] h-[70px] bg-[#fbd9fb]
                rounded-lg flex items-center justify-center"
          >
            <SiAlwaysdata className="w-[40px] h-[40px] text-[#6d6c6c]" />
          </div>
          Data Science
        </div>
        <div
          className="w-[90px] h-[120px] font-light text-[13px]
            flex flex-col gap-3 text-center"
        >
          <div
            className="w-[80px] h-[70px] bg-[#d9fbe0]
                rounded-lg flex items-center justify-center"
          >
            <GiServerRack className="w-[40px] h-[40px] text-[#6d6c6c]" />
          </div>
          System Design
        </div>
        <div
          className="w-[90px] h-[120px] font-light text-[13px]
            flex flex-col gap-3 text-center"
        >
          <div
            className="w-[80px] h-[70px] bg-pink-100
                rounded-lg flex items-center justify-center"
          >
            <SiGoogledataproc className="w-[40px] h-[40px] text-[#6d6c6c]" />
          </div>
          DSA
        </div>
      </div>
    </div>
  );
};

export default Explore;
