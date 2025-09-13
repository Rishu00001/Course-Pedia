import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server_url } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const Signup = () => {
  const dispatch = useDispatch();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${server_url}/api/auth/signup`,
        {
          name,
          email,
          password,
          role,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data));
      setLoading(false);
      navigate("/");
      toast.success("Account created Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      let user = res.user;
      let gname = user.displayName;
      let gemail = user.email;
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
      toast.success("Signed up successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
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
              Let's get started
            </h1>
          </div>
          <div
            className="flex flex-col gap-1 w-[80%] items-start justify-center
          px-3"
          >
            <label htmlFor="name" className="font-semibold">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              id="name"
              className="border-1 w-[100%]
            h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
            />
          </div>
          <div
            className="flex flex-col gap-1 w-[80%] items-start justify-center
          px-3"
          >
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="min. 8 characters"
              type={showPassword ? "text" : "password"}
              value={password}
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
          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              onClick={() => setRole("student")}
              className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6]
            rounded-2xl cursor-pointer hover:border-black ${
              role == "student" && "border-black"
            }`}
            >
              Student
            </span>
            <span
              onClick={() => setRole("educator")}
              className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6]
            rounded-2xl cursor-pointer hover:border-black ${
              role == "educator" && "border-black"
            }`}
            >
              Educator
            </span>
          </div>
          <button
            onClick={handleSignup}
            className="w-[80%] h-[40px] bg-black text-white
          cursor-pointer flex items-center justify-center rounded-[5px]"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Create account"
            )}
          </button>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div
              className="w-[50%] text-[15px] text-[#6f6f6f]
            flex items-center justify-center"
            >
              or continue with
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div
            onClick={googleSignup}
            className="w-[80%] h-[40px] border-1 border-black rounded-[5px]
          flex items-center justify-center cursor-pointer"
          >
            <img src={google} alt="" className="w-[25px]" />
            <span className="text-[20px] text-gray-500 font-semibold">
              oogle
            </span>
          </div>
          <div className="text-[#6f6f6f] text-sm">
            Already have an account?{" "}
            <span
              className="text-black underline underline-offset-1
            cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </div>
        </div>

        {/* right div */}
        <div
          className="w-[50%] h-[100%] rounded-r-2xl bg-black
        md:flex items-center justify-center flex-col hidden"
        >
          <img src={logo} alt="Fudemy Logo" className="w-30 shadow-2xl" />
          <div className="flex flex-col">
            <span className="text-2xl text-white">Welcome to Fudemy</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
