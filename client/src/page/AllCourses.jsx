import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import img from "../assets/SearchAi.png";
import { useSelector } from "react-redux";
import CourseCard from "../component/CourseCard";
const AllCourses = () => {
  const courseData = useSelector((state) => state.course.courseData);
  let [category, setCategory] = useState([]);
  let [filterCourses, setFilterCourses] = useState([]);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false)
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilter = () => {
    let courseCopy = courseData?.slice();
    if (category.length > 0) {
      courseCopy = courseCopy.filter((c) => category.includes(c.category));
    }
    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses();
  }, [courseData]);
  useEffect(()=>{
    applyFilter()
  },[category])
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
       <button className="fixed top-20 left-4 z-50  text-black px-3 py-1
       rounded md:hidden border-2 border-white cursor-pointer" onClick={()=>setIsSideBarVisible(prev=>!prev)}>
        {isSideBarVisible ? 'Hide' : 'Show'} Filters
       </button>
      {/* sidebar */}
      <aside
        className={`w-[260px] h-screen overflow-y-auto bg-black fixed
      top-0 left-0 p-6 py-[130px] border-r border-gray-200 transition-transform
      duration-300 z-15 opacity-60 ${isSideBarVisible ? "translate-x-0" : "-translate-x-full"}
      md:block md:translate-x-0`}
      >
        <h2
          className="text-xl font-bold flex items-center
        justify-center gap-2 text-gray-50 mb-6"
        >
          Filter by Category
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 text-sm bg-transparent text-white p-[20px]"
        >
          <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-1 border border-white shadow-md cursor-pointer">
            Search with AI{" "}
            <img className="w-[25px] h-[25px]" src={img} alt="" />
          </button>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer
          hover:text-gray-200 transition"
          >
            <input
            onChange={toggleCategory}
              type="checkbox"
              value={"App Development"}
              className="accent-white h-4 w-4 rounded-md"
            />{" "}
            App Development
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer
          hover:text-gray-200 transition"
          >
            <input
            onChange={toggleCategory}
              type="checkbox"
              value={"Web Development"}
              className="accent-white h-4 w-4 rounded-md"
            />{" "}
            Web Development
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer
          hover:text-gray-200 transition"
          >
            <input
            onChange={toggleCategory}
              type="checkbox"
              value={"AI/ML"}
              className="accent-white h-4 w-4 rounded-md"
            />{" "}
            AI/ML
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer
          hover:text-gray-200 transition"
          >
            <input
            onChange={toggleCategory}
              type="checkbox"
              value={"Data Science"}
              className="accent-white h-4 w-4 rounded-md"
            />{" "}
            Data Science
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer
          hover:text-gray-200 transition"
          >
            <input
            onChange={toggleCategory}
              type="checkbox"
              value={"DSA"}
              className="accent-white h-4 w-4 rounded-md"
            />{" "}
            DSA
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer
          hover:text-gray-200 transition"
          >
            <input
            onChange={toggleCategory}
              type="checkbox"
              value={"UI/UX Design"}
              className="accent-white h-4 w-4 rounded-md"
            />{" "}
            UI/UX Design
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer
          hover:text-gray-200 transition"
          >
            <input
            onChange={toggleCategory}
              type="checkbox"
              value={"Ethical Hacking"}
              className="accent-white h-4 w-4 rounded-md"
            />{" "}
            Ethical Hacking
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer
          hover:text-gray-200 transition"
          >
            <input
            onChange={toggleCategory}
              type="checkbox"
              value={"Others"}
              className="accent-white h-4 w-4 rounded-md"
            />{" "}
            Others
          </label>
        </form>
      </aside>
      <main
        className="w-full transition-all duration-300 py-[130px]
       md:pl-[300px] flex items-start flex-wrap gap-6 px-[10px]"
      >
        {filterCourses?.map((course,index)=>(<CourseCard key={course._id} {...course}/>))}
      </main>
    </div>
  );
};

export default AllCourses;
