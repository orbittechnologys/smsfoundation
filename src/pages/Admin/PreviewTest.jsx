import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../constants";
import cn from "classnames";

const PreviewTest = () => {
  const { testId } = useParams();

  const [questions, setQuestions] = useState([]);

  const [test, setTest] = useState(null);

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
    }
  }, []);

  return (
    <div className=" mx-auto bg-white shadow-md p-8 rounded-md">
      <h1 className="text-2xl my-5 font-semibold">PreviewTest</h1>
      <div>
        <h1 className="mb-2">Test Name: {test?.name}</h1>
        <h1 className="mb-2">Test Description: {test?.desc}</h1>
        <h1 className="mb-2">Number of questions: {test?.noOfQuestions}</h1>
        <h1 className="mb-2">Total Marks: {test?.totalMarks}</h1>
      </div>
      {questions?.map((question, index) => {
        return (
          <div key={index} className="mt-6">
            <hr className="my-4" />
            <h1 className="mb-2">Marks: {question?.marks}</h1>
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: question?.question }}
            ></div>
            <div className="mb-2 flex items-center">
              <span
                className={
                  question?.answer === "A"
                    ? "text-green-400 font-bold mr-2"
                    : "mr-2"
                }
                dangerouslySetInnerHTML={{ __html: question?.optionA }}
              ></span>
              <span
                className={
                  question?.answer === "B"
                    ? "text-green-400 font-bold mr-2"
                    : "mr-2"
                }
                dangerouslySetInnerHTML={{ __html: question?.optionB }}
              ></span>
              <span
                className={
                  question?.answer === "C"
                    ? "text-green-400 font-bold mr-2"
                    : "mr-2"
                }
                dangerouslySetInnerHTML={{ __html: question?.optionC }}
              ></span>
              <span
                className={
                  question?.answer === "D" ? "text-green-400 font-bold" : ""
                }
                dangerouslySetInnerHTML={{ __html: question?.optionD }}
              ></span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewTest;
