import React, { useEffect } from "react";
import { useState } from "react";
import sfLogo from "../assets/fulllogo.png";
import { Link, useLocation } from "react-router-dom";
import { Outlet, useNavigate } from "react-router";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCloudUpload } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoCloseCircle, IoExitOutline } from "react-icons/io5";
import useAuth from "../authService";
import { SlNote } from "react-icons/sl";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { BiSolidSchool } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";

const Sidebar = () => {
  const { auth, setAuth } = useAuth();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  console.log(auth);

  useEffect(() => {
    const storedData = sessionStorage.getItem("user_id");
    console.log(storedData);
    if (storedData) {
      setAuth(storedData);
      setRole(sessionStorage.getItem("role"));
    } else {
      navigate("/");
    }
  }, []);

  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <button
        onClick={handleToggleSidebar}
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          showSidebar ? "" : "-translate-x-full sm:translate-x-0"
        }  `}
        aria-label="Sidebar"
      >
        <button
          onClick={handleCloseSidebar}
          className="absolute top-3 right-5 text-orange-500 dark:text-gray-400 lg:hidden md:hidden sm:block"
        >
          <IoCloseCircle className="h-8 w-8" />
        </button>
        <div
          className="h-full py-10 px-3  overflow-y-auto bg-[#F1EDDF]"
          style={{ borderRadius: "0 50px 50px 0" }}
        >
          <Link
            to="/"
            className="flex items-center ps-2.5 mb-10 justify-center"
          >
            <img src={sfLogo} className="" alt="Logo" />
            <div></div>
          </Link>
          <ul className="space-y-2 font-medium">
            {role == "ADMIN" ? (
              <li>
                <Link
                  to="/admin/AdminHome"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/admin/AdminHome") ? "bg-orange-200" : ""
                  }`}
                >
                  <IoMdHome className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/admin/AdminHome") ? "text-black" : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    Home
                  </span>
                </Link>
              </li>
            ) : (
              ``
            )}
            {role == "ADMIN" ? (
              <li>
                <Link
                  to="/admin/Schools"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/admin/Schools") ? "bg-orange-200" : ""
                  }`}
                >
                  <GiTeacher className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/admin/Schools") ? "text-black" : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    All Schools
                  </span>
                </Link>
              </li>
            ) : (
              ``
            )}

            {role == "ADMIN" ? (
              <li>
                <Link
                  to="/admin/AllStudents"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/admin/AllStudents") ? "bg-orange-200" : ""
                  }`}
                >
                  <FaUserGraduate className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/admin/AllStudents")
                        ? "text-black"
                        : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    All Students
                  </span>
                </Link>
              </li>
            ) : (
              ``
            )}

            {role == "ADMIN" ? (
              <li>
                <Link
                  to="/admin/allInstructor"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/admin/allInstructor") ? "bg-orange-200" : ""
                  }`}
                >
                  <BiSolidSchool className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/admin/allInstructor")
                        ? "text-black"
                        : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    All Instructors
                  </span>
                </Link>
              </li>
            ) : (
              ``
            )}

            {role == "ADMIN" ? (
              <li>
                <Link
                  to="/admin/AddInstructor"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/admin/AddInstructor") ? "bg-orange-200" : ""
                  }`}
                >
                  <FaChalkboardTeacher className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/admin/AddInstructor")
                        ? "text-black"
                        : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    Add Instructor
                  </span>
                </Link>
              </li>
            ) : (
              ``
            )}
            {role == "ADMIN" ? (
              <li>
                <Link
                  to="/admin/addStudent"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/admin/addStudent") ? "bg-orange-200" : ""
                  }`}
                >
                  <FaUserGraduate className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/admin/addStudent")
                        ? "text-black"
                        : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    Add Student
                  </span>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/inst/InstHome"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/inst/InstHome") ? "bg-orange-200" : ""
                  }`}
                >
                  <IoMdHome className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/inst/InstHome") ? "text-black" : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    Home
                  </span>
                </Link>
              </li>
            )}

            {role == "ADMIN" ? (
              <li>
                <Link
                  to="/admin/AddTest"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/admin/AddTest") ? "bg-orange-200" : ""
                  }`}
                >
                  <SlNote className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/admin/AddTest") ? "text-black" : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    Add Assessment
                  </span>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/inst/addStudent"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/inst/addStudent") ? "bg-orange-200" : ""
                  }`}
                >
                  <FaUserGraduate className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/inst/addStudent") ? "text-black" : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    Add Student
                  </span>
                </Link>
              </li>
            )}

            {role == "ADMIN" ? (
              <li>
                <Link
                  to="/admin/UpdateContent"
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive("/admin/UpdateContent")
                      ? "bg-orange-200 text-black"
                      : ""
                  }`}
                >
                  <BsCloudUpload className="w-5 h-5 text-gray-500 transition duration-75" />
                  <span
                    className={`${
                      isActive("/admin/UpdateContent")
                        ? "text-black"
                        : "text-black"
                    } ms-3 hover:text-orange-500`}
                  >
                    Upload Content
                  </span>
                </Link>
              </li>
            ) : (
              ``
            )}

            {/* <li>
              <Link
                to="/inst/UpdateContent"
                className={`flex items-center p-2 rounded-lg group ${
                  isActive("/inst/UpdateContent")
                    ? "bg-orange-200 text-black"
                    : ""
                }`}
              >
                <TfiReload className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black" />
                <span className="flex-1 ms-3 whitespace-nowrap text-black hover:text-orange-500">
                  Update Content
                </span>
              </Link>
            </li> */}

            {role == "ADMIN" ? (
              <li onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <div className="relative">
                  <div
                    className={`flex items-center p-2 rounded-lg group cursor-pointer ${
                      isActive("/admin/LearningReport") ||
                      isActive("/admin/TestReport")
                        ? "bg-orange-200"
                        : ""
                    }`}
                  >
                    <BsGraphUpArrow className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" />
                    <span
                      className={`flex-1 ms-3 whitespace-nowrap ${
                        isActive("/admin/LearningReport") ||
                        isActive("/admin/TestReport")
                          ? "text-black"
                          : "text-black"
                      } hover:text-orange-500`}
                    >
                      Student Progress
                    </span>
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="absolute left-0 w-48 bg-white rounded-lg shadow-lg z-10"
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      <ul className="py-1">
                        <li>
                          <Link
                            to="/admin/LearningReport"
                            className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                              isActive("/admin/LearningReport")
                                ? "bg-gray-200"
                                : ""
                            }`}
                          >
                            Learning Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/TestReport"
                            className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                              isActive("/admin/TestReport") ? "bg-gray-200" : ""
                            }`}
                          >
                            Test Report
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <li onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <div className="relative">
                  <div
                    className={`flex items-center p-2 rounded-lg group cursor-pointer ${
                      isActive("/inst/LearningReport") ||
                      isActive("/inst/TestReport")
                        ? "bg-orange-200"
                        : ""
                    }`}
                  >
                    <BsGraphUpArrow className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" />
                    <span
                      className={`flex-1 ms-3 whitespace-nowrap ${
                        isActive("/inst/LearningReport") ||
                        isActive("/inst/TestReport")
                          ? "text-black"
                          : "text-black"
                      } hover:text-orange-500`}
                    >
                      Student Progress
                    </span>
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="absolute left-0 w-48 bg-white rounded-lg shadow-lg z-10"
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      <ul className="py-1">
                        <li>
                          <Link
                            to="/inst/LearningReport"
                            className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                              isActive("/inst/LearningReport")
                                ? "bg-gray-200"
                                : ""
                            }`}
                          >
                            Learning Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/inst/TestReport"
                            className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                              isActive("/inst/TestReport") ? "bg-gray-200" : ""
                            }`}
                          >
                            Test Report
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            )}

            <li>
              <Link
                to="/"
                className="mt-28 flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-orange-200 dark:hover:bg-gray-700 group"
              >
                <IoExitOutline className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black" />
                <span className="flex-1 ms-3 whitespace-nowrap text-black hover:text-orange-500">
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
