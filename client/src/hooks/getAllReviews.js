import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { server_url } from "../App";
import { setReviewData } from "../redux/reviewSlice";

const useGetAllReviews = () => {
  const dispatch = useDispatch(); // ✅ Hook at top level

  useEffect(() => {
    const allReviews = async () => {
      try {
        const result = await axios.get(`${server_url}/api/review/getreviews`, {
          withCredentials: true,
        });
        console.log(result.data);
        dispatch(setReviewData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    allReviews();
  }, [dispatch]); 
};

export default useGetAllReviews;
