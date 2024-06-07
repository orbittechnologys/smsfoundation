import React, { useEffect, useState } from "react";
import flask from "../../assets/chemistry.png";
import { PiPlayPauseLight } from "react-icons/pi";
import axios from "axios";
import { BASE_URL, convertSeconds } from "../../constants";
import { useNavigate } from "react-router";
import Hexbg from "../../assets/hexbg.png";
import { IoIosArrowRoundBack } from "react-icons/io";

const MyAcitivity = () => {
  const [filter, setFilter] = useState("ongoing");
  const navigate = useNavigate();

  const CardData = [
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      score: 95,
      status: "ongoing",
    },
    {
      category: "ENGLISH",
      title: "English study content ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      score: 85,
      status: "completed",
    },
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      score: 70,
      status: "ongoing",
    },
    {
      category: "ENGLISH",
      title: "English study content ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      score: 60,
      status: "completed",
    },
  ];

  const filteredData = CardData.filter((card) =>
    filter === "all" ? true : card.status === filter
  );

  const [student, setStudent] = useState(null);
  const [chapters, setChapters] = useState([]);

  const fetchChaptersForStudent = async (studentId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}chapterTime/getForStudent/${studentId}`
      );
      console.log(res.data);
      setChapters(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [studentTest, setStudentTest] = useState([]);

  const fetchStudentTests = async (studentId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}studentTest/getByStudent/${studentId}`
      );
      console.log(res.data);
      setStudentTest(res.data.studentTests);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudent = async () => {
    const userId = sessionStorage.getItem("user_id");
    console.log(userId);
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${userId}`
      );
      console.log(res.data);
      setStudent(res.data.studentDoc);
      fetchChaptersForStudent(res.data.studentDoc?._id);
      fetchStudentTests(res.data.studentDoc?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const goBack = () => {
    navigate("/studenthome");
  };

  return (
    <div>
      <div className="mt-5 flex flex-wrap justify-between items-center mx-10">
        <div className="flex">
          <button className="flex justify-center items-center" onClick={goBack}>
            <IoIosArrowRoundBack className="mr-2 text-3xl" />
          </button>

          <p className="lg:text-2xl sm:text-xl font-semibold">My Activity</p>
        </div>
        <div className="flex cursor-pointer lg:justify-end md:justify-end lg:items-center md:items-center justify-center items-center lg:w-fit md:w-fit w-full lg:my-0 my-5">
          <p
            className={
              filter === "ongoing"
                ? "mr-2 text-white bg-orange-500 font-semibold text-xl py-3 px-3 rounded-full"
                : "mr-2 text-xl"
            }
            onClick={() => setFilter("ongoing")}
          >
            Ongoing
          </p>
          <p
            className={
              filter === "completed"
                ? "text-white bg-orange-500 font-semibold text-xl py-3 px-3 rounded-full"
                : "text-xl"
            }
            onClick={() => setFilter("completed")}
          >
            Completed
          </p>
        </div>
      </div>

      <section className="py-8 px-5 grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
        {filter == "ongoing" &&
          chapters?.map((chapter, index) => {
            return (
              <div key={index} className="grid place-items-center">
                <div
                  style={{
                    backgroundImage: `url(${Hexbg})`,
                  }}
                  className="cont-boxx grid border border-gray-200 shadow-lg place-items-center bg-white p-4 rounded-xl text-center w-fit"
                >
                  <div className="flex justify-start items-start w-full">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                      {chapter?.chapter?.subject?.name}
                    </span>
                  </div>
                  <img src={flask} alt="flask" className="h-10" />
                  <p className="font-semibold mt-5">{chapter?.chapter?.name}</p>
                  <p className="text-gray-600">{chapter?.chapter?.desc}</p>
                  <div className="ongoing mt-10">
                    <span className="p-3 rounded-full bg-gray-300 text-orange-500">
                      {convertSeconds(chapter?.time)}
                    </span>
                    <div className="grid place-items-center ">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/pdf/${chapter?.chapter?._id}`)
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

        {filter == "completed" &&
          studentTest?.map((st, index) => {
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
                    {st?.test?.chapter?.name}
                  </p>
                  <p className="text-gray-600">{st?.test?.chapter?.desc}</p>
                  <div className="ongoing mt-10">
                    <span className="p-3 rounded-full bg-gray-300 text-orange-500">
                      {st?.marks} / {st?.test?.totalMarks}
                    </span>
                    <div className="grid place-items-center ">
                      <button
                        type="button"
                        onClick={() => navigate(`/mcq/${st?.test?._id}`)}
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
      </section>
    </div>
  );
};

export default MyAcitivity;
