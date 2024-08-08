import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../constants";
import cn from "classnames";

const PreviewTest = () => {
  const { testId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [role, setRole] = useState("NONE");
  const navigate = useNavigate();

  const fetchQuestions = async (testId) => {
    try {
      const res = await axios.get(`${BASE_URL}question/getQuestions/${testId}`);
      console.log(res.data);
      setQuestions(res.data);
    } catch (error) {
      console.log(error);
    }
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
      setRole(localStorage.getItem("role"));
    }
  }, [testId]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="mx-auto px-10">
      <div className="breadcrumb my-5">
        <span className="text-orange-500">{currentQuestionIndex + 1}</span>/
        <span>{questions.length}</span>
      </div>
      {/* <h1 className="text-2xl my-5 font-semibold">PreviewTest</h1>
      <div>
        <h1 className="mb-2">Test Name: {test?.name}</h1>
        <h1 className="mb-2">Test Description: {test?.desc}</h1>
        <h1 className="mb-2">Number of questions: {test?.noOfQuestions}</h1>
        <h1 className="mb-2">Total Marks: {test?.totalMarks}</h1>
      </div> */}
      <div className="w-full">
        {questions.length > 0 && (
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 place-items-start">
            {/* <hr className="my-4" /> */}
            {/* <h1 className="mb-2">
            Marks: {questions[currentQuestionIndex]?.marks}
          </h1> */}
            <div className="w-full h-full">
              <div className="mb-2 border-2 p-3 rounded-lg flex justify-start items-center ">
                <span className="mr-2">{currentQuestionIndex + 1}.</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: questions[currentQuestionIndex]?.question,
                  }}
                ></div>
              </div>
              <div className="mb-2 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-items-center gap-5">
                <div className="border-2 px-5 py-1 rounded-xl flex justify-center items-center">
                  <span className="mr-2">A.</span>
                  <span
                    className={cn({
                      "text-green-400 font-bold mr-2":
                        questions[currentQuestionIndex]?.answer === "A",
                      "mr-2": questions[currentQuestionIndex]?.answer !== "A",
                    })}
                    dangerouslySetInnerHTML={{
                      __html: questions[currentQuestionIndex]?.optionA,
                    }}
                  ></span>
                </div>
                <div className="border-2 px-5 py-1 rounded-xl flex justify-center items-center">
                  <span className="mr-2">B.</span>
                  <span
                    className={cn({
                      "text-green-400 font-bold mr-2":
                        questions[currentQuestionIndex]?.answer === "B",
                      "mr-2": questions[currentQuestionIndex]?.answer !== "B",
                    })}
                    dangerouslySetInnerHTML={{
                      __html: questions[currentQuestionIndex]?.optionB,
                    }}
                  ></span>
                </div>
                <div className="border-2 px-5 py-1 rounded-xl flex justify-center items-center">
                  <span className="mr-2">C.</span>
                  <span
                    className={cn({
                      "text-green-400 font-bold mr-2":
                        questions[currentQuestionIndex]?.answer === "C",
                      "mr-2": questions[currentQuestionIndex]?.answer !== "C",
                    })}
                    dangerouslySetInnerHTML={{
                      __html: questions[currentQuestionIndex]?.optionC,
                    }}
                  ></span>
                </div>
                <div className="border-2 px-5 py-1 rounded-xl flex justify-center items-center">
                  <span className="mr-2">D.</span>
                  <span
                    className={cn({
                      "text-green-400 font-bold":
                        questions[currentQuestionIndex]?.answer === "D",
                    })}
                    dangerouslySetInnerHTML={{
                      __html: questions[currentQuestionIndex]?.optionD,
                    }}
                  ></span>
                </div>
                {questions[currentQuestionIndex]?.optionE && (
                  <div className="border-2 px-5 py-1 rounded-xl flex justify-center items-center">
                    <span className="mr-2">E.</span>
                    <span
                      className={cn({
                        "text-green-400 font-bold":
                          questions[currentQuestionIndex]?.answer === "E",
                      })}
                      dangerouslySetInnerHTML={{
                        __html: questions[currentQuestionIndex]?.optionE,
                      }}
                    ></span>
                  </div>
                )}

                {questions[currentQuestionIndex]?.optionF && (
                  <div className="border-2 px-5 py-1 rounded-xl flex justify-center items-center">
                    <span className="mr-2">E.</span>
                    <span
                      className={cn({
                        "text-green-400 font-bold":
                          questions[currentQuestionIndex]?.answer === "F",
                      })}
                      dangerouslySetInnerHTML={{
                        __html: questions[currentQuestionIndex]?.optionF,
                      }}
                    ></span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-full lg:border lg:p-5 lg:rounded-xl">
              <h1 className="text-xl font-semibold text-center">Summary</h1>
              <span
                dangerouslySetInnerHTML={{
                  __html: questions[currentQuestionIndex]?.hint,
                }}
              ></span>
            </div>

            <div className="flex justify-center items-center flex-wrap">
              <h1 className="text-lg font-bold m-5">
                Page Reference : {questions[currentQuestionIndex]?.pageRef}
              </h1>

              {role == "STUDENT" && (
                <button
                  onClick={() =>
                    navigate(
                      "/pdf/" +
                        test?.chapter +
                        "?page=" +
                        questions[currentQuestionIndex]?.pageRef
                    )
                  }
                  className="text-white h-1/3 mt-2 bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center w-fit"
                >
                  View PDF
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full grid lg:place-items-start md:place-items-start place-items-center">
        <div className="flex justify-between items-center my-5 lg:w-fit md:w-fit w-56 gap-5">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={cn("bg-orange-500 rounded-2xl text-white px-4 py-1 ", {
              "opacity-50 cursor-not-allowed": currentQuestionIndex === 0,
            })}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className={cn("bg-orange-500 rounded-2xl text-white px-4 py-1 ", {
              "opacity-50 cursor-not-allowed":
                currentQuestionIndex === questions.length - 1,
            })}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewTest;
