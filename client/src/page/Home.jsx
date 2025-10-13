import React from "react";
import Navbar from "../component/Navbar";
import home from "../assets/home1.jpg";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import { SiViaplay } from "react-icons/si";
import Logos from "../component/Logos";
import Explore from "../component/Explore";
import CardPage from "../component/CardPage";
import { Link } from "react-router-dom";
import About from "../component/About";
import Footer from "../component/Footer";
const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Navbar />
        <img
          src={home}
          alt="home"
          className="object-cover w-full lg:h-full h-[50vh]"
        />

        {/* Heading Text */}
        <span
          className="absolute lg:top-[10%] top-[16%] w-full flex items-center justify-center 
          text-white font-bold text-[20px] md:text-[40px] lg:text-[70px] text-center px-2"
        >
          Grow your skills to infinity
        </span>

        <span
          className="absolute lg:top-[18%] top-[22%] w-full flex items-center justify-center 
          text-white font-bold text-[20px] md:text-[40px] lg:text-[70px] text-center px-2"
        >
          Your Career Path
        </span>

        {/* Buttons */}
        <div
          className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-full
          flex items-center justify-center gap-3 flex-wrap"
        >
          <Link to = {"/allcourses"} >
            <button
              className=" flex gap-2 px-5 py-2 border-2 lg:border-white border-black 
            text-[18px] font-light rounded-[10px] cursor-pointer 
            lg:text-white text-black bg-black/40 lg:bg-transparent hover:scale-105 transition"
            >
              All Courses{" "}
              <SiViaplay className="w-[30px] h-[30px] fill-black lg:fill-white" />
            </button>
          </Link>

          <button
            className=" flex gap-2 px-5 py-2 border-2 lg:border-white border-black 
            text-[18px] font-light rounded-[10px] cursor-pointer bg-black 
            text-white lg:text-black lg:bg-white hover:scale-105 transition"
          >
            Search with AI{" "}
            <img
              src={ai}
              alt=""
              className="w-[30px] h-[30px] rounded-full hidden lg:block"
            />
            <img
              src={ai1}
              alt=""
              className="w-[30px] h-[30px] rounded-full lg:hidden"
            />
          </button>
        </div>
      </div>
      <Logos />
      <Explore />
      <CardPage />
      <About/>
      <Footer/>
    </div>
  );
};

export default Home;
