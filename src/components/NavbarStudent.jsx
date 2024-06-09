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
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiSearch } from "react-icons/hi";
import useAuth from "../authService";

const NavbarStudent = ({ handleSearch}) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("NO");
  const [subjects, setSubjects] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Chapter Name");
  const [query,setQuery] = useState("");

  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchUser = async () => {
    const userId = sessionStorage.getItem("user_id");
    setRole(sessionStorage.getItem("role"));
    try {
      const res = await axios.get(`${BASE_URL}user/id/${userId}`);
      setUser(res.data.userDoc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleFormSearch = (e) => {
    e.preventDefault();
    handleSearch(query);
  }



  const fetchSubjectV2 = async (schoolId, standard) => {
    try {
      const res2 = await axios.get(`${BASE_URL}school/id/${schoolId}`);
      const reqbody = {
        standard,
        syllabus: res2.data.school.syllabus,
        medium: res2.data.school.medium,
      };
      const res = await axios.post(`${BASE_URL}subject/getSubjects`, reqbody);
      setSubjects(res.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudent = async (user_id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${user_id}`
      );
      setStudentData(res.data);
      fetchSubjectV2(res.data.studentDoc.school, res.data.studentDoc.standard);
      fetchActivity(res.data.studentDoc?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchStudent(auth);
    }
  }, [auth]);

  return (
    <>
      <div
        className={`flex flex-wrap lg:justify-between justify-center items-center px-4 py-3 lg:py-5 w-full ${
          role === "ADMIN" || role === "INSTRUCTOR"
            ? "bg-white lg:border-b md:border-b lg:border-gray-400 md:border-gray-400"
            : "bg-gray-100"
        }`}
      >
        
        <Link to="/studenthome" className="hidden lg:block md:block ml">
          <img src={sfLogo} alt="logo" className="lg:h-10 h-5 mr-8" />
        </Link>
        <div className="flex items-center w-full lg:w-auto justify-center lg:justify-start gap-4 lg:ml-10 relative z-50">
          <HiMiniSquares2X2 className="text-2xl" />
          <div className="relative">
            <select
              value={selectedOption}
              onChange={handleChange}
              className="appearance-none bg-transparent border-none focus:outline-none w-full px-4 py-2 pr-8 text-gray-700 font-semibold leading-tight focus:ring-0"
              style={{ zIndex: 50 }}
            >
              <option value="Chapter Name" disabled>
                Subject Name
              </option>
              <option value="English">English</option>
              <option value="Kannada">Kannada</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative flex items-center border border-gray-300 rounded px-3 py-2 w-full lg:w-auto mt-4 lg:mt-0 lg:ml-5">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for course"
            className="appearance-none bg-transparent border-none focus:outline-none text-gray-700 w-full"
          />
          <button>
          <HiSearch className="text-gray-500 mr-2 text-2xl" />
          </button>
          
        </form>

        <div className="flex justify-center items-center gap-8 lg:ml-40 mt-4 lg:mt-0 w-full lg:w-auto text-lg font-semibold">
          <Link to="/studenthome" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/mycourses" className="text-gray-700 hover:text-gray-900">
            Courses
          </Link>
          <Link to="/mycourse" className="text-gray-700 hover:text-gray-900">
            Activity
          </Link>
        </div>

        <div className="flex items-center gap-5 w-full lg:w-auto mt-4 lg:mt-0">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2"
            >
              <FaUserGraduate />
              <div className="flex flex-col gap-1 items-center">
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
                {role == "ADMIN" ? (
                  <div
                    onClick={() => {
                      navigate(`/admin/adminProfile/${user?._id}`);
                      toggleDropdown();
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-start items-center gap-2"
                  >
                    <CgProfile className="text-blue-500" />
                    Profile
                  </div>
                ) : role == "INSTRUCTOR" ? (
                  <div
                    onClick={() => {
                      navigate(`/inst/instructorProfile/${user?._id}`);
                      toggleDropdown();
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-start items-center gap-2"
                  >
                    <CgProfile className="text-blue-500" />
                    Profile
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      navigate(`/studentProfile/${user?._id}`);
                      toggleDropdown();
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-start items-center gap-2"
                  >
                    <CgProfile className="text-blue-500" />
                    Profile
                  </div>
                )}
                <p
                  onClick={() => handleLogout()}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-start items-center gap-2"
                >
                  <AiOutlineLogout className="text-red-500" /> Logout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavbarStudent;
