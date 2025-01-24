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
  const studentId = localStorage.getItem("student_id");
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const fetchQuestions = async (testId) => {
    try {
      const res = await axios.get(`${BASE_URL}question/getQuestions/${testId}`);
      console.log("questions", res.data);
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

  const fetchSelectedAnswers = async (testId, studentId) => {
    const params = {
      testId: testId,
      studentId: studentId,
    };

    try {
      const { data } = await axios.get(
        `${BASE_URL}/studentTest/getTestResult`,
        { params }
      );
      setSelectedAnswers(data?.studentTestDoc?.selectedAnswers);
    } catch (error) {
      console.log("error fetched selected answers", error);
    }
  };

  useEffect(() => {
    if (testId) {
      fetchQuestions(testId);
      fetchTest(testId);
      fetchSelectedAnswers(testId, studentId);
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

      <div className="w-full">
        {questions.length > 0 && (
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 place-items-start">
            <div className="w-full h-full">
              <div className="mb-2 border-2 p-3 rounded-lg flex justify-start items-center">
                <span className="mr-2">{currentQuestionIndex + 1}.</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: questions[currentQuestionIndex]?.question,
                  }}
                ></div>
              </div>
              <div className="mb-2 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-items-start gap-5">
                {["A", "B", "C", "D", "E", "F"].map((option) => {
                  const optionKey = `option${option}`;
                  const isCorrect =
                    questions[currentQuestionIndex]?.answer === option;
                  const isSelected =
                    selectedAnswers?.[currentQuestionIndex]
                      ?.selectedAnswerByUser === option;
                  return (
                    questions[currentQuestionIndex]?.[optionKey] && (
                      <div
                        key={option}
                        className="border-2 px-5 py-1 rounded-xl flex justify-start items-center w-full"
                      >
                        <span className="mr-2">{option}.</span>
                        <span
                          className={cn({
                            "text-green-400 font-bold": isCorrect,
                            "text-red-400 font-bold": isSelected && !isCorrect,
                            "mr-2": !isSelected && !isCorrect,
                          })}
                          dangerouslySetInnerHTML={{
                            __html:
                              questions[currentQuestionIndex]?.[optionKey],
                          }}
                        ></span>
                      </div>
                    )
                  );
                })}
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
                  className="text-white h-1/3 mt-2 bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center w-fit"
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
