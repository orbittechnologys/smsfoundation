import React from "react";
import { useState } from "react";
import sfLogo from "../assets/sflogo.png";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCloudUpload } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };
  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        className=" fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div
          className="h-full py-10 px-3  overflow-y-auto bg-[#140342]"
          style={{ borderRadius: "0 50px 50px 0" }}
        >
          <Link
            to="/"
            className="flex items-center ps-2.5 mb-10 justify-center"
          >
            <img src={sfLogo} className="lg:h-14 me-3 sm:h-7" alt="Logo" />
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/inst/addStudent"
                className="flex items-center p-2 rounded-lg  hover:bg-gray-100  group"
              >
                <FaRegCircleUser className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3 text-white hover:text-orange-500">
                  Add Student
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/inst/UpdateContent"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsCloudUpload className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap text-white hover:text-orange-500">
                  Upload Content
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/inst/UpdateContent"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <TfiReload className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap text-white hover:text-orange-500">
                  Update Content
                </span>
              </Link>
            </li>

            <li onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <div className="relative">
                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                  <BsGraphUpArrow className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap text-white hover:text-orange-500">
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
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Learning Report
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inst/TestReport"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Test Report
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>

            <li>
              <Link
                to="/"
                className="mt-28 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoExitOutline className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap text-white hover:text-orange-500">
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
