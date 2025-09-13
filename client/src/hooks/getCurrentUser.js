import axios from "axios";
import React, { useEffect, useState } from "react";
import { server_url } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  let [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${server_url}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null))
      }
      finally{
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);
  return loading;
};

export default useCurrentUser;
