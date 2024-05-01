import { useEffect, useState } from "react";
import flask from "../../assets/chemistry.png";
import { GrDocumentPdf } from "react-icons/gr";
import axios from "axios";
import { BASE_URL, convertSeconds } from "../../constants";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import Slogan from "../../assets/slogan.png";
import Img2 from "../../assets/img2.png";
import Hexbg from "../../assets/hexbg.png";
import { PiPlayPauseLight } from "react-icons/pi";

const StudentHome = () => {
  const [subjects, setSubjects] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("NO");
  const [chapter, setChapters] = useState([]);
  const [query, setQuery] = useState("");
  const [chapterActivity, setChapterActivity] = useState([]);
  const [testActivity, setTestActivity] = useState([]);

  const { auth } = useAuth();
  console.log(auth);
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

  useEffect(() => {
    if (auth) {
      fetchStudent(auth);
    }
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

  const handleSearch = async () => {
    if (query?.length > 0) {
      try {
        const res = await axios.get(`${BASE_URL}chapter/query/${query}`);
        console.log(res.data);
        setQuery("");
        setChapters(res.data.chapters);
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

  return (
    <>
      <div className="relative h-screen">
        <section className="bg-[#140342] py-8 h-2/4">
          <div className="flex justify-center items-center w-full h-full">
            <div className="text-center">
              <h1 className="lg:text-3xl md:text-2xl text-base  text-white font-bold mb-4">
                Empowering students to shape their <br /> futures with knowledge
                as their guide.
              </h1>
              <button
                type="button"
                onClick={() => navigate("/mycourse")}
                className="mt-5 text-white hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
              >
                My Courses
              </button>
            </div>
          </div>
        </section>

        <div className="search-maindiv absolute top-1/2 left-1/2 w-fit transform -translate-x-1/2 -translate-y-1/2  mx-auto p-6 rounded-2xl shadow-md bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
          <div className="flex justify-center items-center px-10">
            <div className="space-y-10 w-auto search-div">
              <div className="flex justify-center items-center  p-3 space-x-6 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 inputbutton-div">
                <div
                  className="search-inputt flex justify-center items-center p-4 w-72 space-x-4 rounded-full"
                  id="search-inputt"
                >
                  <input
                    className=" outline-none border-none "
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    placeholder="Search by Chapter Name"
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
                    {subjects?.map((subject, index) => {
                      return (
                        <option key={index} value={subject?._id}>
                          {subject?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="bg-gray-800 py-3 px-5 text-white font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer ">
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
        </div>
        <div className="mt-20 w-full text-center">
          <p>{chapter?.length} Materials Found</p>
        </div>
        <section className=" py-8 px-5 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
          {chapter.map((card, index) => (
            <div
              key={index}
              style={{ width: "350px", height: "300px" }}
              className="grid border border-gray-300 rounded-lg shadow-2xl"
            >
              <div
                style={{ backgroundImage: `url(${Hexbg})` }}
                className="grid place-items-center bg-white p-4 rounded-xl text-center"
              >
                <div className="flex justify-start items-start w-full">
                  <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                    {card.subject.name}
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

        <section className="">
          <h1 className="font-semibold text-xl m-5">Your Activity</h1>

          <section className="">
            <h1 className="font-semibold ml-5 underline text-lg my-3">
              Continue Reading
            </h1>
            <div className=" py-8 px-5 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
              {chapterActivity?.map((chapActivity, index) => {
                return (
                  <div key={index} className="grid place-items-center ">
                    <div
                      style={{
                        backgroundImage: `url(${Hexbg})`,
                      }}
                      className="cont-boxx grid border border-gray-200 shadow-lg place-items-center bg-white p-4 rounded-xl text-center w-fit"
                    >
                      {/* <div className="flex justify-start items-start w-full">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                      {chapActivity?.chapter?.subject?.name}
                    </span>
                  </div> */}
                      <img src={flask} alt="flask" className="h-10" />
                      <p className="font-semibold mt-5">
                        {chapActivity?.chapter?.name}
                      </p>
                      <p className="text-gray-600">
                        {chapActivity?.chapter?.desc}
                      </p>
                      <div className="ongoing mt-10">
                        <span className="p-3 rounded-full bg-gray-300 text-orange-500">
                          {convertSeconds(chapActivity?.time)}
                        </span>
                        <div className="grid place-items-center ">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/pdf/${chapActivity?.chapter?._id}`)
                            }
                            className="mt-5 flex justify-center items-center text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
                          >
                            <PiPlayPauseLight className="mr-2 text-xl" /> Resume
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="">
            <h1 className="font-semibold ml-5 underline text-lg my-3">
              Tests Given
            </h1>
            <div className=" py-8 px-5 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
              {testActivity?.map((testAct, index) => {
                return (
                  <div key={index} className="grid ">
                    <div
                      style={{
                        backgroundImage: `url(${Hexbg})`,
                        height: "300px",
                        width: "350px",
                      }}
                      className=" grid border place-items-center border-gray-200 shadow-lg  bg-white p-4 rounded-xl text-center w-fit"
                    >
                      {/* <div className="flex justify-start items-start w-full">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                      Science
                    </span>
                  </div> */}
                      <img src={flask} alt="flask" className="h-10" />
                      <p className="font-semibold mt-5">
                        {testAct?.test?.name}
                      </p>
                      <p className="text-gray-600">{testAct?.test?.desc}</p>
                      <div className="ongoing mt-10">
                        <span className="p-3 rounded-full bg-gray-300 text-orange-500">
                          {testAct?.marks} / {testAct?.test?.totalMarks}
                        </span>
                        <div className="grid place-items-center ">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/mcq/${testAct?.test?._id}`)
                            }
                            className="mt-5 flex justify-center items-center text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
                          >
                            <PiPlayPauseLight className="mr-2 text-xl" /> Retake
                            Test
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>

        <div className="flex justify-center items-center my-5 static">
          <img src={Img2} alt="" />
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
