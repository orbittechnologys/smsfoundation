import React, { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { GrDocumentPdf } from "react-icons/gr"; // Import the icon if not already imported
import Hexbg from "../../assets/hexbg.png"; // Replace with your actual path
import flask from "../../assets/chemistry.png"; // Replace with your actual path

const NewMyCourses = () => {
  const [subjects, setSubjects] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchStudent = async (user_id) => {
    console.log(user_id);
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${user_id}`
      );
      setStudentData(res.data);
      console.log(res.data);
      fetchSubjectV2(res.data.studentDoc.school, res.data.studentDoc.standard);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchStudent(auth);
    }
  }, [auth]);

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

      // Load the first subject's chapters by default
      if (res.data.subjects.length > 0) {
        const firstSubjectId = res.data.subjects[0]?._id;
        setSelectedSubject(firstSubjectId);
        getChapterBySubject(firstSubjectId);
      }
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer select-div">
        {subjects?.map((subject, index) => (
          <div
            key={index}
            className={`whitespace-nowrap border-none mx-2 px-3 py-1 rounded-full hover:bg-orange-200 ${
              selectedSubject === subject?._id
                ? "text-orange-500 underline underline-offset-8"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedSubject(subject?._id);
              console.log(subject?._id);
              getChapterBySubject(subject?._id);
            }}
          >
            <span className="font-poppins px-5 py-1.5 rounded-full">{subject?.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <section className="py-8 px-5 grid lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
          {chapters.map((card, index) => (
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
                    {card.subject.name}
                  </span>
                </div>
                <img src={flask} alt="flask" className="h-10" />
                <p className="font-semibold">{card?.name}</p>
                <p className="text-gray-600">{card?.desc}</p>
                <div className="flex justify-center items-center gap-2">
                  <button
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
      </div>
    </>
  );
};

export default NewMyCourses;
