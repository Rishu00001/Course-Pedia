import React, { useState } from "react";
import logo from "../assets/cp.png";
import google from "../assets/google.jpg";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { server_url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${server_url}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data));
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
    const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      let user = res.user;
      let gname = user.displayName;
      let gemail = user.email;
      let role = ""
      const result = await axios.post(
        `${server_url}/api/auth/googleauth`,
        {
          name: gname,
          email: gemail,
          role,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setUserData(result.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-[#dddbdb] w-[100dvw] h-[100dvh] flex items-center justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[100%] md:w-200 h-[100%] md:h-135 bg-white shadow-xl
         rounded-2xl flex"
      >
        {/* left div */}
        <div
          className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center
       justify-center gap-3"
        >
          <div>
            <h1 className="font-semibold text-black text-2xl">
              Log in 
            </h1>
          </div>

          <div
            className="flex flex-col gap-1 w-[80%] items-start justify-center
           px-3"
          >
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="abc@gmail.com"
              type="email"
              id="email"
              className="border-1 w-[100%]
             h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
            />
          </div>
          <div
            className="flex flex-col gap-1 w-[80%] items-start justify-center
           px-3 relative"
          >
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="min. 8 characters"
              type={showPassword ? "text" : "password"}
              id="password"
              className="border-1 w-[100%]
             h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
            />
            {showPassword ? (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute w-[20px] h-[20px] cursor-pointer
             right-[5%] bottom-[10%]"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute w-[20px] h-[20px] cursor-pointer
             right-[5%] bottom-[10%]"
              />
            )}
          </div>
          <button
            onClick={handleLogin}
            className="w-[80%] h-[40px] bg-gray-800 text-white
           cursor-pointer flex items-center justify-center rounded-[5px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Log in"}
          </button>
          <Link to={"/forget"}>
            <span className="text-[13px] cursor-pointer text-[#6f6f6f]">
              Forgot password?
            </span>
          </Link>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div
              className="w-[50%] text-[15px] text-[#c4c4c4]
             flex items-center justify-center"
            >
              or continue with
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div
          onClick={googleLogin}
            className="w-[80%] h-[40px] border-1 border-black rounded-[5px]
           flex items-center justify-center cursor-pointer"
          >
            <img src={google} alt="" className="w-[25px]" />
            <span className="text-[20px] text-gray-500 font-semibold">
              oogle
            </span>
          </div>
          <div className="text-[#6f6f6f] text-sm">
            Don't have an account?{" "}
            <span
              className="text-black underline-offset-1 underline
            cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create here
            </span>
          </div>
        </div>

        {/* right div */}
        <div
          className="w-[50%] h-[100%] rounded-r-2xl bg-gray-800
         md:flex items-center justify-center flex-col hidden"
        >
          <img src={logo} alt="CoursePedia Logo" className="w-30 shadow-2xl" />
          <div className="flex flex-col justify-center items-center mt-5 gap-3">
            <span className="text-2xl text-white">Welcome To</span>
            <span className="text-4xl font-bold text-white">CoursePedia</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
