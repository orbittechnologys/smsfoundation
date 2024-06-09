import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../constants";
import Studentpng from "../../assets/Reading_book_re_kqpk.png";

const StudentProfile = () => {
  const [user, setUser] = useState(null);
  const { studentId } = useParams();

  const [userDoc,setUserDoc] = useState(null);

  const fetchUser = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}user/id/${userId}`);
      console.log(res.data);
      setUserDoc(res.data.userDoc);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchStudent = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${studentId}`
      );
      console.log(res.data);
      fetchUser(res.data.studentDoc?.user);
      setUser(res.data.studentDoc);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPasswordApi = async (reqBody) => {
    try {
      const res = await axios.post(`${BASE_URL}user/resetPassword`,reqBody);
      console.log(res.data);
      alert('Password changed successfully');
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }

  const resetPassword =  (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");

    if(!password){
      alert('Please enter password');
    }else{
      handleResetPasswordApi({
        userId:user?.user,
        newPassword: password
      })
    }
  }

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
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Email:</span> {userDoc?.email}
            </p>
            <form className="mb-6" onSubmit={resetPassword}>
                <label htmlFor="default-input" className="block text-gray-600 mb-2 text-sm font-semibold">Reset Password</label>
                <input name="password" type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " />
                <button type="submit" className="my-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Submit</button>
            </form>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
