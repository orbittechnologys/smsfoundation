import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../constants";

const Results = () => {
  const { testId } = useParams();

  const [student, setStudent] = useState(null);

  const [result, setResult] = useState(null);

  const fetchResult = async (reqBody) => {
    console.log(reqBody);
    try {
      const res = await axios.post(
        `${BASE_URL}studentTest/getResults`,
        reqBody
      );
      console.log(res.data);
      setResult(res.data.testResults);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudent = async () => {
    try {
      console.log(sessionStorage.getItem("user_id"));
      const userId = sessionStorage.getItem("user_id");
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${userId}`
      );
      console.log(res.data);
      fetchResult({
        studentId: res.data.studentDoc?._id,
        testId: testId,
      });
      setStudent(res.data.studentDoc);
    } catch (error) {
      alert("Not logged in as student");
      console.log(error);
      navigate("/");
    }
  };

  const fetchTest = async (testId) => {
    try {
      const res = await axios.get(`${BASE_URL}test/id/${testId}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (testId) {
      fetchTest(testId);
      fetchStudent();
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div className="grid place-items-center h-screen w-full bg-[#F1EDDF]">
      <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Test Results
        </h1>

        <div className="mb-8">
          <p className="text-lg mb-2">
            Test Name:{" "}
            <span className="font-semibold">{result?.test?.name}</span>
          </p>
          <p className="text-lg mb-2">
            Test Description:{" "}
            <span className="font-semibold">{result?.test?.desc}</span>
          </p>
          <p className="text-lg mb-2">
            Marks Scored: <span className="font-semibold">{result?.marks}</span>{" "}
            / <span className="font-semibold">{result?.test?.totalMarks}</span>
          </p>
        </div>

        <div className="mb-8">
          <p className="text-lg mb-2">
            Student Name:{" "}
            <span className="font-semibold">
              {result?.student?.firstName} {result?.student?.lastName}
            </span>
          </p>
          <p className="text-lg mb-2">
            Roll No:{" "}
            <span className="font-semibold">{result?.student?.rollNo}</span>
          </p>
          <p className="text-lg mb-2">
            Standard:{" "}
            <span className="font-semibold">{result?.student?.standard}</span>
          </p>
        </div>

        <button
          onClick={() => navigate("/mycourse")}
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Go to My Courses
        </button>
      </div>
    </div>
  );
};

export default Results;
