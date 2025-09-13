import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server_url } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  // for step 1
  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${server_url}/api/auth/sendotp`,
        { email },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setStep(2);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // for step2
  const verifyOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${server_url}/api/auth/verifyotp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      setStep(3);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //for step3

  const resetPassword = async () => {
    setLoading(true);
    try {
      if (newPassword != conpassword) {
        return toast.error("Password not matched");
      }
      const res = await axios.post(
        `${server_url}/api/auth/resetpassword`,
        {
          email,
          password: newPassword,
        },
        { withCredentials: true }
      );
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-[100dvh] flex items-center justify-center bg-white
  lg:px-4"
    >
      {/* step1 */}
      {step === 1 && (
        <div
          className="bg-white shadow-md rounded-xl p-8 max-w-md
      w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset your Password
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium
                text-gray-700"
              >
                {" "}
                Enter your email{" "}
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                id="email"
                className="mt-1 w-full
                px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="abc@example.com"
                required
                autoComplete="off"
              />
            </div>
            <button
              className="w-full bg-black hover:bg-[#4b4b4b]
            text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              disabled={loading}
              onClick={sendOtp}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
            </button>
          </form>
          <Link to={"/login"}>
            <div className="text-small text-center mt-4">Back to login</div>
          </Link>
        </div>
      )}
      {step === 2 && (
        <div
          className="bg-white lg:shadow-md rounded-xl p-8 max-w-md
      w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium
                text-gray-700"
              >
                Please enter the 4-digit code sent to your email
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                id="otp"
                className="mt-1 w-full
                px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="****"
                required
                autoComplete="off"
              />
            </div>
            <button
              onClick={verifyOTP}
              className="w-full bg-black hover:bg-[#4b4b4b]
            text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "verifyOTP"}
            </button>
          </form>
          <Link to={"/login"}>
            <div className="text-small text-center mt-4">Back to login</div>
          </Link>
        </div>
      )}
      {step === 3 && (
        <div
          className="bg-white lg:shadow-md rounded-xl p-8 max-w-md
      w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            The password should be atleast 8 characters and must contain 1
            uppercase, 1 lowercase , 1 numeric value and a special character
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium
                text-gray-700"
              >
                Set new Password
              </label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                id="password"
                className="mt-1 w-full
                px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="****"
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="conpassword"
                className="block text-sm font-medium
                text-gray-700"
                disabled = {loading}
              >
                Confirm Password
              </label>
              <input
                value={conpassword}
                onChange={(e) => setConpassword(e.target.value)}
                type="text"
                id="conpassword"
                className="mt-1 w-full
                px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="****"
                required
                autoComplete="off"
              />
            </div>
            <button
              onClick={resetPassword}
              className="w-full bg-black hover:bg-[#4b4b4b]
            text-white py-2 px-4 rounded-md font-medium cursor-pointer"
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
          <Link to={"/login"}>
            <div className="text-small text-center mt-4">Back to login</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
