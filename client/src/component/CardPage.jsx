import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";

const CardPage = () => {
  const { courseData } = useSelector((store) => store.course);
  const [popularCourses, setPopularCourses] = useState([]);
  useEffect(() => {
    setPopularCourses(courseData);
  }, [courseData]);
  return (
    <div className="relative flex items-center justify-center flex-col">
      <h1
        className="md:text-[45px] text-[30px] font-semibold
      text-center mt-[30px] px-[20px]"
      >
        Our Popular Courses
      </h1>
      <span
        className="lg:w-[50%] md:w-[80%] text-[15px] text-center
      mt-[30px] px-[20px] mb-[30px]"
      >
        Explore top-rated courses designed to boost your skills, enhance career,
        and unlock oppertunities in tech, AI, business and beyond.
      </span>
      <div
        className="w-[100%]  flex items-center
      justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px]
      p-[10px] mb-[40px]"
      >
        {popularCourses?.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CardPage;
