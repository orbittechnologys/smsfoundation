import React, { useState, useEffect } from "react";
import { IoMdStopwatch } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../constants";
import cn from "classnames";
import Img3 from "../assets/img3.png";

const Mcq = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);

  const [test, setTest] = useState(null);

  const [questionNumber, setQuestionNumber] = useState(1);

  const [answers, setAnswers] = useState([]);

  const [totalScore, setTotalScore] = useState(0);

  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  const fetchStudent = async () => {
    try {
      console.log(sessionStorage.getItem("user_id"));
      const userId = sessionStorage.getItem("user_id");
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${userId}`
      );
      console.log(res.data);
      setStudent(res.data.studentDoc);
    } catch (error) {
      alert("Not logged in as student");
      console.log(error);
      navigate("/");
    }
  };

  const fetchQuestions = async (testId) => {
    try {
      const res = await axios.get(`${BASE_URL}question/getQuestions/${testId}`);
      console.log(res.data);
      setQuestions(res.data);
      setAnswers(
        Array.from({ length: res.data?.length }, () => {
          return { option: "NONE", score: 0 };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionClick = (index, option) => {
    console.log(index, option);
    const correctAnswer = questions[index]?.answer;
    const marks = questions[index]?.marks;

    // Create a copy of the answers array
    const updatedAnswers = [...answers];

    if (correctAnswer === option) {
      console.log("Correct answer");
      updatedAnswers[index] = { option, score: marks };
    } else {
      console.log("Wrong answer");
      updatedAnswers[index] = { option, score: 0 };
    }

    // Update the state with the new answers array
    setAnswers(updatedAnswers);
  };

  const fetchTest = async (testId) => {
    try {
      const res = await axios.get(`${BASE_URL}test/id/${testId}`);
      console.log(res.data);
      setTest(res.data.test);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (testId) {
      fetchQuestions(testId);
      fetchTest(testId);
      fetchStudent();
    }
  }, []);

  const submitTestApi = async (reqBody) => {
    try {
      const res = await axios.post(
        `${BASE_URL}studentTest/submitTest`,
        reqBody
      );
      console.log(res.data);
      alert("Test submitted successfully");
      navigate("/results/" + test?._id);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleSubmitTest = () => {
    console.log(answers);
    let total = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].option == "NONE") {
        alert("Please solve all the questions before you submit.");
        setQuestionNumber(i + 1);
        break;
      }
      total += answers[i].score;
    }
    console.log("Total score ", total);
    setTotalScore(total);

    const reqBody = {
      testId: test?._id,
      studentId: student?._id,
      marks: total,
    };
    submitTestApi(reqBody);
  };

  return (
    <>
      <div className="flex justify-between px-10 py-6 mb-5 bg-[#140342]">
        <div className="flex justify-center items-center">
          <div className="mr-2">
            <img src={Img3} alt="" className="h-10" />
          </div>
          <div className="text-white">
            <p className="text-xl font-semibold">{test?.name}</p>
            <p>{test?.desc}</p>
          </div>
        </div>
        {/* <div className="flex justify-center items-center">
          <IoMdStopwatch className="mr-2 text-orange-500" />
          <p className="text-white font-semibold">40.00</p>
        </div> */}
      </div>
      <div className="max-w-7xl">
        <div className="flex justify-between items-center mx-10">
          <div>
            <p>
              {questionNumber}/ {questions?.length}
            </p>
          </div>
          <div>
            <p>Total Marks : {test?.totalMarks}</p>
          </div>
        </div>

        {Array.isArray(questions) ? (
          <div className="mx-10 my-5">
            <div className="border border-gray-500 p-5 rounded-xl">
              <div
                dangerouslySetInnerHTML={{
                  __html: questions[questionNumber - 1]?.question,
                }}
              ></div>
            </div>
            <div className="mt-5 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 ">
              <div
                className={cn({
                  "border border-gray-500 p-5 rounded-xl":
                    answers[questionNumber - 1]?.option != "A",
                  "border-2 border-green-800 p-5 rounded-xl text-green-600":
                    answers[questionNumber - 1]?.option == "A",
                })}
                onClick={() => handleOptionClick(questionNumber - 1, "A")}
              >
                <div className="flex justify-start items-center">
                  <span className="mr-2 font-semibold">A.</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: questions[questionNumber - 1]?.optionA,
                    }}
                  ></div>
                </div>
              </div>
              <div
                className={cn({
                  "border border-gray-500 p-5 rounded-xl":
                    answers[questionNumber - 1]?.option != "B",
                  "border-2 border-green-800 p-5 rounded-xl text-green-600":
                    answers[questionNumber - 1]?.option == "B",
                })}
                onClick={() => handleOptionClick(questionNumber - 1, "B")}
              >
                <div className="flex justify-start items-center">
                  <span className="mr-2 font-semibold">B.</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: questions[questionNumber - 1]?.optionB,
                    }}
                  ></div>
                </div>
              </div>
              <div
                className={cn({
                  "border border-gray-500 p-5 rounded-xl":
                    answers[questionNumber - 1]?.option != "C",
                  "border-2 border-green-800 p-5 rounded-xl text-green-600":
                    answers[questionNumber - 1]?.option == "C",
                })}
                onClick={() => handleOptionClick(questionNumber - 1, "C")}
              >
                <div className="flex justify-start items-center">
                  <span className="mr-2 font-semibold">C.</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: questions[questionNumber - 1]?.optionC,
                    }}
                  ></div>
                </div>
              </div>
              <div
                className={cn({
                  "border border-gray-500 p-5 rounded-xl":
                    answers[questionNumber - 1]?.option != "D",
                  "border-2 border-green-800 p-5 rounded-xl text-green-600":
                    answers[questionNumber - 1]?.option == "D",
                })}
                onClick={() => handleOptionClick(questionNumber - 1, "D")}
              >
                <div className="flex justify-start items-center">
                  <span className="mr-2 font-semibold">D.</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: questions[questionNumber - 1]?.optionD,
                    }}
                  ></div>
                </div>
              </div>

              {questions[questionNumber - 1]?.optionE && (
                <div
                  className={cn({
                    "border border-gray-500 p-5 rounded-xl":
                      answers[questionNumber - 1]?.option != "E",
                    "border-2 border-green-800 p-5 rounded-xl text-green-600":
                      answers[questionNumber - 1]?.option == "E",
                  })}
                  onClick={() => handleOptionClick(questionNumber - 1, "E")}
                >
                  <div className="flex justify-start items-center">
                    <span className="mr-2 font-semibold">E.</span>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: questions[questionNumber - 1]?.optionE,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {questions[questionNumber - 1]?.optionF && (
                <div
                  className={cn({
                    "border border-gray-500 p-5 rounded-xl":
                      answers[questionNumber - 1]?.option != "F",
                    "border-2 border-green-800 p-5 rounded-xl text-green-600":
                      answers[questionNumber - 1]?.option == "F",
                  })}
                  onClick={() => handleOptionClick(questionNumber - 1, "F")}
                >
                  <div className="flex justify-start items-center">
                    <span className="mr-2 font-semibold">F.</span>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: questions[questionNumber - 1]?.optionF,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          ``
        )}

        <div className="flex justify-start items-center mx-10">
          <div className="">
            {questionNumber > 1 ? (
              <button
                type="button"
                onClick={() => setQuestionNumber(questionNumber - 1)}
                className="mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
              >
                Previous
              </button>
            ) : (
              ``
            )}

            {questionNumber < questions?.length ? (
              <button
                type="button"
                onClick={() => setQuestionNumber(questionNumber + 1)}
                className="mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
              >
                Next
              </button>
            ) : (
              ``
            )}
          </div>
          <button
            type="button"
            onClick={() => handleSubmitTest()}
            className="m-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
          >
            Submit Test
          </button>
        </div>
      </div>
    </>
  );
};

export default Mcq;
