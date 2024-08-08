import React, { useState } from "react";
import sfLogo from "./assets/sflogo.png";
import useAuth from "./authService";
import { useNavigate } from "react-router";
import axios from "axios";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import Icons from "./assets/icons.png";
import Img1 from "./assets/img1.png";
import { BASE_URL } from "./constants";
import { toast } from "react-toastify";

const RestPassword = () => {
  const [email, setEmail] = useState("");
  const [enteredOtp,setEnteredOtp] = useState(null);
  const [password, setPassword] = useState("");
  const [confPassword,setConfPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const [role, setRole] = useState("");
  const [otp,setOtp] = useState(null);
  const [user,setUser] = useState(null);
  const [stages,setStages] = useState(1);
  const navigate = useNavigate();

  const callLoginApi = async (reqbody) => {
    try {
      const res = await axios.post(`${BASE_URL}user/login`, reqbody);
      console.log(res.data);
      setAuth(res.data._id);
      setRole(res.data.role);
      localStorage.setItem("user_id", res.data._id);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "STUDENT") {
        navigate("/studenthome");
      } else if (res.data.role === "ADMIN") {
        navigate("/admin/LearningReport");
      } else if (res.data.role === "INSTRUCTOR") {
        navigate("/inst/addstudent");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  const verifyOtp = async () => {
    if(enteredOtp!=otp){
      alert('Invalid OTP');
    }else{
      alert('OTP verified');
      setStages(3);
    }
  }

  const triggerOtp =async () => {
    try {
      const res = await axios.post(`${BASE_URL}user/triggerOtp`,{email});
      console.log(res.data);
      setOtp(res.data.otp);
      setUser(res.data.userDoc);
      setStages(2);
    } catch (error) {
      console.log(error.response);
      alert(error?.response?.data?.msg);
    }
  } 

  const resetPassword = async () => {
    if(password?.length <5 ){
      alert('Password must atleast be of length 6')
    }else if(password != confPassword){
      alert('Passwords do not match')
    }else{
      try {
        const res = await axios.post(`${BASE_URL}user/resetPassword`,{
          userId:user._id,
          newPassword: password
        })
        console.log(res.data);
        alert('Password reset successfully');
        navigate('/')
      } catch (error) {
        console.log(error);
        alert('Something went wrong')
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    callLoginApi({ email, password });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 h-screen w-full">
        <div className="bg-[#140342] grid place-items-center p-10">
          <div className="grid place-items-center">
            <div className="flex justify-center items-center w-full">
              <div>
                <img src={sfLogo} alt="logo" />
              </div>
              <div className="mx-5">
                <span
                  className="border border-gray-500"
                  style={{
                    display: "inline-block",
                    height: "45px",
                  }}
                ></span>
              </div>
              <div>
                <p className="text-white font-bold text-2xl">SEHGAL</p>
                <p className="text-gray-300 text-xl">Foundation</p>
              </div>
            </div>
            <div>
              <img src={Icons} alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto p-6 bg-white grid place-items-center p-10">
          <div>
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl">
                Reset Password
              </h1>
              <img src={Img1} alt="" />
            </div>
            <div
              className="space-y-4 md:space-y-6 mt-5"
            >
            {stages ==1 ? (
              <>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="email"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid place-items-center">
                <button
                    type="button"
                    onClick={() => triggerOtp()}
                    className="text-white bg-orange-500 font-semibold hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-7 py-1.5 text-center border-2 border-orange-500 "
                  >
                    Send OTP
                </button>
              </div>
              </>
            ): stages == 2 ? (
              <>
              <div>
                              <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                              >
                                Enter OTP
                              </label>
                              <input
                                type="number"
                                name="otp"
                                id="otp"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="otp"
                                required=""
                                onChange={(e) => setEnteredOtp(e.target.value)}
                              />
                            </div>

                            <div className="grid place-items-center">
                              <button
                                  type="button"
                                  onClick={() => verifyOtp()}
                                  className="text-white bg-orange-500 font-semibold hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-7 py-1.5 text-center border-2 border-orange-500 "
                                >
                                  Verify OTP
                              </button>
                            </div>
              </>
            ): stages ==3 ? (
              <>
              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Create New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEye className="w-5 h-5 text-gray-500" />
                    ) : (
                      <FaEyeSlash className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                    placeholder="Password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEye className="w-5 h-5 text-gray-500" />
                    ) : (
                      <FaEyeSlash className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid place-items-center">
                <button
                  type="button"
                  onClick={() => resetPassword()}
                  className="text-white bg-orange-500 font-semibold hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-7 py-1.5 text-center border-2 border-orange-500 "
                >
                  Reset password
                </button>
              
              </div>
              </>
            ): ``}  
              

              <div>
                <p className="text-xl">
                  <span className="text-orange-500">Together</span>
                  <span className="text-gray-500"> We Empower</span>
                  <span className="text-green-500"> Rural India</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestPassword;
