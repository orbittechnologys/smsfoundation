import React, { useEffect, useState } from "react";
import sfLogo from "../assets/logoflex.png";
import { Outlet, useNavigate } from "react-router";
import { CiUser } from "react-icons/ci";
import axios from "axios";
import { BASE_URL } from "../constants";
import { FaCaretDown } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const fetchStudent = async () => {
    const userId = sessionStorage.getItem("user_id");
    setRole(sessionStorage.getItem("role"));
    console.log(userId);
    try {
      const res = await axios.get(`${BASE_URL}user/id/${userId}`);
      console.log(res.data.userDoc);
      setUser(res.data.userDoc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div
        className={`flex justify-between flex-wrap items-center px-10 lg:py-5 ${
          role === "ADMIN" || role === "INSTRUCTOR"
            ? "bg-white lg:border-b lg:border-gray-400"
            : "bg-gray-100"
        } w-full`}
      >
        <div className="flex justify-center items-center lg:py-0 py-3">
          {role !== "ADMIN" && role !== "INSTRUCTOR" && (
            <Link to="/">
              <img src={sfLogo} alt="logo" className="lg:h-10 h-5" />
            </Link>
          )}
        </div>
        <div className="flex justify-center items-center gap-5">
          {/* <div className="flex justify-center items-center gap-5">
            <span>Language</span>
            <button>English</button>
          </div> */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2"
            >
              <FaUserGraduate />
              <div className="flex justify-center items-center flex-col gap-1">
                <span>{user?.username}</span>
                {(user?.role === "ADMIN" || user?.role === "INSTRUCTOR") && (
                  <span className="text-sm absolute top-6 text-gray-500">
                    {user?.role === "ADMIN" ? "Admin" : "Instructor"}
                  </span>
                )}
              </div>

              <FaCaretDown className="h-4 w-4" />
            </button>
            {dropdownOpen && (
              <div className="z-50 absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                <div
                  onClick={() => navigate(`/studentProfile/${user?._id}`)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-start items-center gap-2"
                >
                  <CgProfile className="text-blue-500" />
                  Profile
                </div>

                <a
                  href="/"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-start items-center gap-2"
                >
                  <AiOutlineLogout className="text-red-500" /> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
