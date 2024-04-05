import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../constants";
import Studentpng from "../../assets/Reading_book_re_kqpk.png";

const StudentProfile = () => {
  const [user, setUser] = useState(null);
  const { studentId } = useParams();

  const fetchStudent = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${studentId}`
      );
      setUser(res.data.studentDoc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full my-10">
      {user && (
        <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg">
          <img
            src={Studentpng}
            alt=""
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Roll No:</span> {user?.rollNo}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Standard:</span> {user?.standard}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Syllabus:</span> {user?.syllabus}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Medium:</span> {user?.medium}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
