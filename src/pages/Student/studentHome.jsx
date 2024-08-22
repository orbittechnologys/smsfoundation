import { useEffect, useState } from "react";
import flask from "../../assets/chemistry.png";
import { GrDocumentPdf } from "react-icons/gr";
import axios from "axios";
import { BASE_URL, convertSeconds } from "../../constants";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import Slogan from "../../assets/slogan.png";
import Img2 from "../../assets/final_haati.png";
import Hexbg from "../../assets/hexbg.png";
import { PiPlayPauseLight } from "react-icons/pi";
import { Bar } from "react-chartjs-2";
import sfLogo from "../../assets/logoflex.png";
import { CiUser } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiSearch } from "react-icons/hi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import Counter from "./Counter";
import NavbarStudent from "../../components/NavbarStudent";
import Saple from "../Student/saple";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentHome = () => {
  const [subjects, setSubjects] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("NO");
  const [chapter, setChapters] = useState([]);
  const [query, setQuery] = useState("");
  const [chapterActivity, setChapterActivity] = useState([]);
  const [testActivity, setTestActivity] = useState([]);
  const [role, setRole] = useState("STUDENT");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { auth } = useAuth();
  console.log(auth);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const navigate = useNavigate();

  const fetchActivity = async (studentId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}studentTest/activity/${studentId}`
      );
      console.log(res.data);
      setTestActivity(res.data);

      const res2 = await axios.get(
        `${BASE_URL}chapterTime/activity/${studentId}`
      );
      console.log(res2.data);
      setChapterActivity(res2.data);
    } catch (error) {
      console.log(error);
    }
  };
  defaults.font.size = 18;
  defaults.font.weight = "bolder";
  defaults.font.family = "Helvetica";
  defaults.font.lineHeight = 0.6;

  const data = {
    labels: chapterActivity.map((chapActivity) => {
      const name = chapActivity?.chapter?.name || "";
      return name.length > 10 ? name.slice(0, 8) + "..." : name;
    }),
    datasets: [
      {
        label: "Time Spent (seconds)",
        data: chapterActivity.map((chapActivity) => chapActivity?.time),
        backgroundColor: "rgba(242, 102, 81, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 0.1,
        barThickness: 60,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data1 = {
    labels: testActivity.map((testAct) => {
      const name = testAct?.test?.name || "";
      return name.length > 10 ? name.slice(0, 8) + "..." : name;
    }),
    datasets: [
      {
        label: "Marks Percentage",
        data: testActivity.map(
          (testAct) => (testAct?.marks / testAct?.test?.totalMarks) * 100
        ),
        backgroundColor: "rgba(19, 3, 66, 1)",
        borderColor: "rgba(19, 3, 66, 1)",
        borderWidth: 0.1,
        barThickness: 60,
      },
    ],
  };

  const fetchStudent = async (user_id) => {
    console.log(user_id);
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${user_id}`
      );
      setStudentData(res.data);
      console.log(res.data);
      fetchSubjectV2(res.data.studentDoc.school, res.data.studentDoc.standard);
      fetchActivity(res.data.studentDoc?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    const userId = sessionStorage.getItem("user_id");
    setRole(sessionStorage.getItem("role"));
    if (userId) {
      try {
        const res = await axios.get(`${BASE_URL}user/id/${userId}`);
        setUser(res.data.userDoc);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (auth) {
      fetchStudent(auth);
    }
    fetchUser();
  }, [auth]);

  const fetchSubject = async (standard, syllabus, medium) => {
    const reqbody = {
      standard,
      syllabus,
      medium,
    };
    console.log(reqbody);

    try {
      const res = await axios.post(`${BASE_URL}subject/getSubjects`, reqbody);
      console.log(res.data);
      setSubjects(res.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubjectV2 = async (schoolId, standard) => {
    try {
      const res2 = await axios.get(`${BASE_URL}school/id/${schoolId}`);
      console.log(res2.data);

      const reqbody = {
        standard,
        syllabus: res2.data.school.syllabus,
        medium: res2.data.school.medium,
      };
      console.log(reqbody);

      const res = await axios.post(`${BASE_URL}subject/getSubjects`, reqbody);
      console.log(res.data);
      setSubjects(res.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const getChapterBySubject = async (subjectId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}chapter/getChapterBySubject/${subjectId}`
      );
      console.log(res.data);
      setChapters(res.data.chapters);
      window.scrollTo({
        top: window.scrollY + 1000,
        behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query?.length > 0) {
      try {
        const res = await axios.get(`${BASE_URL}chapter/query/${query}`);
        console.log(res.data);
        setQuery("");
        setChapters(res.data.chapters);
        window.scrollTo({
          top: window.scrollY + 1000,
          behavior: "smooth",
        });
      } catch (error) {
        console.log(error);
      }
    } else if (selectedSubject != "NO") {
      try {
        const res = await axios.get(
          `${BASE_URL}chapter/getChapterBySubject/${selectedSubject}`
        );
        console.log(res.data);
        setChapters(res.data.chapters);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getChapterBySubject(selectedSubject);
  }, [selectedSubject]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* <div
        className={`flex flex-wrap lg:justify-between justify-center items-center px-4 py-3 lg:py-5 w-full
            bg-white lg:border-b md:border-b lg:border-gray-400 md:border-gray-400`}
      > */}
      <div>
        <div className="max-w-screen-2xl flex flex-wrap items-center  justify-between mx-auto p-4">
          {/* <Link to="/studenthome" className="hidden lg:block md:block ml">
           */}
          <Link
            to="/studenthome"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={sfLogo} alt="logo" className="lg:h-10 h-5 mr-8" />
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">
              {isMenuOpen ? "Close main menu" : "Open main menu"}
            </span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              {isMenuOpen ? (
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 1L1 13M1 1l16 12"
                />
              ) : (
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              )}
            </svg>
          </button>

          <div
            className={`w-full md:block md:w-auto ${
              isMenuOpen ? "" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <div className="flex items-center w-full lg:w-auto justify-center lg:justify-start gap-4 lg:ml-10 relative z-50">
                  {/* <HiMiniSquares2X2 className="text-2xl" /> */}
                  <div className="relative">
                    <select
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="appearance-none bg-transparent border-none focus:outline-none w-full px-4 py-2 pr-8 text-gray-700 font-semibold leading-tight focus:ring-0"
                      style={{ zIndex: 50 }}
                    >
                      <option value="NO">Subject</option>
                      {subjects?.map((subject) => {
                        return (
                          <option value={subject?._id} key={subject?._id}>
                            {subject?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </li>

              <li>
                <form
                  onSubmit={handleSearch}
                  className="relative flex items-center border border-gray-300 rounded px-3 py-2 w-full lg:w-auto mt-4 lg:mt-0 lg:ml-5"
                >
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
              </li>
              <li>
                <div className="lg:flex md:flex grid    lg:justify-center lg:items-center  md:justify-center md:items-center place-items-center   gap-8 lg:ml-40 mt-4 lg:mt-0 w-full lg:w-auto text-lg font-semibold">
                  <Link
                    to="/studenthome"
                    className="text-orange-500 hover:text-gray-900"
                  >
                    Home
                  </Link>
                  {/* <Link
                    to="/mycourses"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Courses
                  </Link> */}
                  <Link
                    to="/mycourse"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Activity
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-5 w-full lg:w-auto mt-4 lg:mt-0">
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center gap-2"
                    >
                      <FaUserGraduate />
                      <div className="flex flex-col gap-1 items-center">
                        <span>{user?.username}</span>
                        {(user?.role === "ADMIN" ||
                          user?.role === "INSTRUCTOR") && (
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
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-start items-center gap-2 cursor-pointer"
                          >
                            <CgProfile className="text-blue-500" />
                            Profile
                          </div>
                        )}
                        <p
                          onClick={() => handleLogout()}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-start items-center gap-2 cursor-pointer"
                        >
                          <AiOutlineLogout className="text-red-500" /> Logout
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <Saple /> */}
      <div className="h-screen" style={{ padding: 0, margin: 0 }}>
        <section className="bg-[#2f2d51] py-8 h-2/3">
          <div className="flex flex-col md:flex-row justify-evenly items-center w-full h-2/3">
            <h1
              style={{ lineHeight: "1.2em" }}
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-semibold mb-4 md:w-1/2 px-5"
            >
              Empowering students to shape their futures with knowledge as their
              guide.
            </h1>

            <div className="flex flex-col md:flex-row justify-center items-center my-5 static">
              <img src={Img2} alt="" className="w-24 md:w-36 lg:w-48" />
              <img src={Slogan} alt="" className="w-28 md:w-36 lg:w-48" />
            </div>
          </div>
          <div className="grid grid-cols-1 place-items-center">
            <button
              type="button"
              onClick={() => navigate("/mycourses")}
              className="mt-5 text-white bg-orange-600 hover:text-white border border-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-2xl 
                text-lg px-10 py-3 md:px-10 md:py-3 lg:px-20 lg:py-4 xl:px-24 xl:py-5 xl:text-2xl text-center  mb-2 md:mt-0"
            >
              My Courses
              <svg
                className="inline-block ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                width="16"
                height="16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* <div className="search-maindiv absolute top-1/2 left-1/2 w-fit transform -translate-x-1/2 -translate-y-1/2  mx-auto p-5 rounded-2xl shadow-md bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
          <div className="flex justify-center items-center px-10">
            <div className="space-y-10 w-auto search-div">
              <div
                style={{
                  height: "4.5em",
                  width: "38em",
                }}
                className="flex justify-center items-center space-x-6 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 inputbutton-div"
              >
                <div
                  className="  search-inputt  flex justify-center items-center p-4 w-72 space-x-4 rounded-full"
                  id="search-inputt"
                >
                  <input
                    className="w-9/12 outline-none border-none "
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    placeholder="Chapter Name"
                  />
                </div>
                <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer select-div">
                  <select
                    className="whitespace-nowrap border-none"
                    onChange={(e) => {
                      setSelectedSubject(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    <option value="NO">Select Subject</option>
                    {subjects?.map((subject, index) => (
                      <option key={index} value={subject?._id}>
                        {subject?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  style={{
                    marginRight: "10px",
                  }}
                  className="bg-gray-800 py-2  px-2 text-white font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer "
                >
                  <button
                    className="flex justify-center items-center gap-2"
                    onClick={() => handleSearch()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 opacity-30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>{" "}
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div
        // className="lg:absolute lg:top-3/4 lg:left-1/2 lg:w-3/4 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <Counter />
        </div>

        <div className="mt-32 w-full text-center">
          <p>{chapter?.length} Activites Found</p>
        </div>
        <section className=" py-8 px-5 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
          {chapter.map((card, index) => (
            <div
              key={index}
              style={{ width: "350px", height: "300px" }}
              className="grid bordergit border-gray-300 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl hover:shadow-orange-200 transition duration-300 ease-in-out"
            >
              <div
                style={{ backgroundImage: `url(${Hexbg})` }}
                className="grid place-items-center bg-white p-4 rounded-xl text-center"
              >
                <div className="flex justify-start items-start w-full">
                  <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                    {card?.subject?.name}
                  </span>
                </div>
                <img src={flask} alt="flask" className="h-10" />
                <p className="font-semibold">{card?.name}</p>
                <p className="text-gray-600">{card?.desc}</p>
                <div className="flex justify-center items-center gap-2">
                  <button
                    // onClick={() => navigate(`/pdf/${card?._id}`)}
                    onClick={() => navigate(`/Content/${card?._id}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center"
                  >
                    <GrDocumentPdf className="mr-2" />
                    View
                  </button>
                  {card?.test ? (
                    <button
                      className="flex justify-center items-center mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center"
                      onClick={() => navigate("/mcq/" + card?.test)}
                    >
                      Take Test
                    </button>
                  ) : (
                    ``
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* <section className="">
          <h1 className="font-bold text-4xl xl:ml-40">Activity</h1>

          <section className="">
            <div className="flex flex-wrap justify-evenly gap-4">
              <div className="w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-md relative">
                <button
                  className="absolute top-4 right-4 text-[#F26651]"
                  onClick={() => navigate(`/mycourse`)}
                >
                  View more
                </button>
                <Bar data={data} options={options} />
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-md">
                <Bar data={data1} options={options} />
              </div>
            </div>
          </section>
        </section> */}

        <div className="flex justify-center items-center my-5 static">
          <img src={Img2} alt="" className="w-24 md:w-48" />
          <img src={Slogan} alt="" />
        </div>
        <footer className="bg-[#140342]">
          <div className="grid place-items-center py-5">
            <p className="text-white">
              Copyright Sehgal Foundation © 2024 | All Rights Reserved
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default StudentHome;
