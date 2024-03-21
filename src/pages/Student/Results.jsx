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
      const res = await axios.post(`${BASE_URL}studentTest/getResults`, reqBody);
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

  return (<div>
    <h1>Results</h1>
    <p>Test Name : {result?.test?.name}</p>
    <p>Test Description : {result?.test?.desc}</p>
    <p>Marks scored : {result?.marks}</p>
    <p>Total Marks: {result?.test?.totalMarks}</p>
    <p>Student Name : {result?.student?.firstName} {result?.student?.lastName}</p>
    <p>Roll No : {result?.student?.rollNo}</p>
    <p>Standard : {result?.student?.standard}</p>
    <button onClick={()=> navigate('/mycourse')}>Go to my courses</button>
  </div>);
};

export default Results;
