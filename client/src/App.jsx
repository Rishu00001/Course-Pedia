import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import { ToastContainer, toast } from "react-toastify";
import useCurrentUser from "./hooks/getCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./page/Profile";
import ForgetPassword from "./page/ForgetPassword";
import EditProfile from "./page/EditProfile";
import Dashboard from "./page/educator/Dashboard";
import Courses from "./page/educator/Courses";
import CreateCourse from "./page/educator/CreateCourse";
import useCreatorCourse from "./hooks/getCreatorCourse";
import EditCourse from "./page/educator/EditCourse";
import useCourses from "./hooks/getPublishedCourses";
import AllCourses from "./page/AllCourses";

export const server_url = "http://localhost:8000";
const App = () => {
  let loading = useCurrentUser();
  useCourses();
  useCreatorCourse();
  const { userData } = useSelector((store) => store.user);
  if (loading) return null;
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forget"
          element={!userData ? <ForgetPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/"} />}
        />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/"} />}
        />
        <Route
          path="/dashboard"
          element={
            userData && userData?.role == "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userData && userData?.role == "educator" ? (
              <Courses />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/createcourse"
          element={
            userData && userData?.role == "educator" ? (
              <CreateCourse />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/editcourse/:courseId"
          element={
            userData && userData?.role == "educator" ? (
              <EditCourse />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
