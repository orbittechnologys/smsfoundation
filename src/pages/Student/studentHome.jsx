import { useEffect, useState } from "react";
import flask from "../../assets/chemistry.png";
import { GrDocumentPdf } from "react-icons/gr";
import axios from "axios";
import { BASE_URL } from "../../constants";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import Slogan from "../../assets/slogan.png";

const studentHome = () => {
  const [subjects, setSubjects] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("NO");
  const [chapter, setChapters] = useState([]);
  const CardData = [
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "ENGLISH",
      title: "English study content ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "ENGLISH",
      title: "English study content ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
  ];

  const { auth } = useAuth();
  console.log(auth);
  const navigate = useNavigate();

  const fetchStudent = async (user_id) => {
    console.log(user_id);
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${user_id}`
      );
      setStudentData(res.data);
      console.log(res.data);
      fetchSubject(
        res.data.studentDoc.standard,
        res.data.studentDoc.syllabus,
        res.data.studentDoc.medium
      );
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
      const res = await axios.post(`${BASE_URL}/subject/getSubjects`, reqbody);
      console.log(res.data);
      setSubjects(res.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (selectedSubject != "NO") {
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
              <h1 className="text-3xl  text-white font-semibold mb-4">
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

        <div className="absolute top-1/2 left-1/2 w-fit transform -translate-x-1/2 -translate-y-1/2  mx-auto p-6 bg-orange-600 rounded-2xl shadow-md">
          <div className="flex justify-center items-center px-10">
            <div className="space-y-10">
              <div className="flex items-center p-3 space-x-6 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
                <div className="flex justify-center items-center bg-gray-100 p-4 w-72 space-x-4 rounded-full">
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
                  </svg>
                  <input
                    className="bg-gray-100 outline-none border-none"
                    type="text"
                    placeholder="Search by Chapter Name"
                  />
                </div>
                <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
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
                <div className="bg-gray-800 py-3 px-5 text-white font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer">
                  <button onClick={() => handleSearch()}>Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className=" py-8 px-5 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="mt-20 w-full col-span-3 text-center">
            <p>{chapter?.length} Materials Found</p>
          </div>
          {chapter.map((card, index) => (
            <div
              key={index}
              className="grid border border-gray-300 rounded-lg shadow-2xl "
            >
              <div className="grid place-items-center bg-white p-4 rounded-xl text-center">
                <div className="flex justify-start items-start w-full">
                  <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                    {card.subject.name}
                  </span>
                </div>
                <img src={flask} alt="flask" className="h-10" />
                <p className="font-semibold">{card?.name}</p>
                <p className="text-gray-600">{card?.desc}</p>
                <button
                  onClick={() => navigate(`/pdf/${card?._id}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center"
                >
                  <GrDocumentPdf className="mr-2" />
                  View
                </button>
                {card?.test ? (
                  <button
                    className="my-2 text-gray-500"
                    onClick={() => navigate("/mcq/" + card?.test)}
                  >
                    Take Test
                  </button>
                ) : (
                  ``
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
      <div className="grid place-items-center my-5">
        <img src={Slogan} alt="" />
      </div>
      <footer className="bg-[#140342]">
        <div className="grid place-items-center py-5">
          <p className="text-white">Copyright © 2024 | All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default studentHome;
