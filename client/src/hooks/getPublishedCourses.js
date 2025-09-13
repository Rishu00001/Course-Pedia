import axios from "axios";
import React, { useEffect } from "react";
import { server_url } from "../App";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";

const useCourses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCourseData = async () => {
      try {
        const res = await axios.get(
          `${server_url}/api/course/getpublished`,
          {
            withCredentials: true,
          }
        );
        console.log(res?.data);

        dispatch(setCourseData(res?.data));
      } catch (error) {
        console.log(error);
      }
    };
    getCourseData()
  },[]);
};

export default useCourses;
