import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../constants";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col justify-center items-center h-screen w-full bg-[#F1EDDF]">
      <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-md">
        <h1 className="text-3xl font-semibold mb-4 text-center text-orange-500">
          Results
        </h1>

        <div className="">
          <p className="text-lg mb-2 text-center">
            <span className="font-semibold">{result?.test?.name}</span>
          </p>
          <div className="flex justify-center items-center">
            <span className="text-lg mb-2 flex justify-center items-center bg-gray-200 px-4 py-1 rounded-xl">
              <span className="font-semibold">{result?.marks}</span> /{" "}
              <span className="font-semibold">{result?.test?.totalMarks}</span>
            </span>
          </div>
          {/* <p className="text-lg mb-2">
            Test Description:{" "}
            <span className="font-semibold">{result?.test?.desc}</span>
          </p> */}
        </div>
        <div className="my-5 shadow-xl border rounded-xl">
          <p className="px-5 py-2 text-orange-500 font-semibold">
            Performance Feedback Goes here
          </p>
        </div>
        {/* <div className="mb-8">
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
        </div> */}

        {/* <button
          onClick={() => navigate("/mycourse")}
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Go to My Courses
        </button> */}
        <div className="grid grid-cols-2 gap-5 my-5">
          <button
            type="button"
            onClick={() => navigate('/preview/'+testId)}
            className="text-white bg-orange-500 hover:bg-blue-800 font-semibold focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
          >
            Review Test
          </button>
          <button
            type="button"
            onClick={()=> navigate('/mcq/'+testId)}
            className="text-white bg-orange-500 hover:bg-blue-800 font-semibold focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
          >
            Retake Test
          </button>
        </div>
      </div>
      <div className="my-5">
        <Link to="/mycourse">
          <p className="font-semibold underline">Back to home</p>
        </Link>
      </div>
    </div>
  );
};

export default Results;
