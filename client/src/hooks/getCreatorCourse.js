import axios from "axios";
import React, { useEffect } from "react";
import { server_url } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourse } from "../redux/courseSlice";

const useCreatorCourse = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.userData);
  return useEffect(() => {
    const creatorCourses = async () => {
      try {
        const res = await axios.get(
          `${server_url}/api/course/creatorcourses`,
          {
            withCredentials: true,
          }
        );
        console.log(res?.data);
        dispatch(setCreatorCourse(res?.data));
      } catch (error) {
        console.log(error);
      }
    };
    creatorCourses();
  }, [userData]);
};

export default useCreatorCourse;
