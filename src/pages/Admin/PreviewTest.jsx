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
    <div>
      <h1>PreviewTest</h1>
      <div>
        <h1>Test Name : {test?.name}</h1>
        <h1>Test Description : {test?.desc}</h1>
        <h1>Number of questions : {test?.noOfQuestions}</h1>
        <h1>Total Marks : {test?.totalMarks}</h1>
      </div>
      {questions?.map((question, index) => {
        return (
          <div key={index}>
            <hr/>
            <h1>Marks : {question?.marks}</h1>
            <div dangerouslySetInnerHTML={{ __html: question?.question }}></div>
            <div
              className={cn({
                "text-green-400 font-bold": question?.answer == "A",
              })}
              dangerouslySetInnerHTML={{ __html: question?.optionA }}
            ></div>
            <div
             className={cn({
                "text-green-400 font-bold": question?.answer == "B",
              })}
            dangerouslySetInnerHTML={{ __html: question?.optionB }}></div>
            <div 
             className={cn({
                "text-green-400 font-bold": question?.answer == "C",
              })}
            dangerouslySetInnerHTML={{ __html: question?.optionC }}></div>
            <div
             className={cn({
                "text-green-400 font-bold": question?.answer == "D",
              })}
            dangerouslySetInnerHTML={{ __html: question?.optionD }}></div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewTest;
