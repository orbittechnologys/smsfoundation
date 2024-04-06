import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { PiPasswordDuotone } from "react-icons/pi";

const AllStudents = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentd, setSelectedStudent] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const getAllStudents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}student/getAll`);
      console.log(res.data.students);
      setAllStudents(res.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const reqbody = {
      studentId: selectedStudentd,
      newPassword: newPassword,
    };
    console.log(reqbody);
    try {
      const res = await axios.post(`${BASE_URL}student/resetPassword`, reqbody);
      console.log(res.data);
      alert("Password changed successfully");
    } catch (error) {
      console.log(error);
    }

    setShowModal(false);
  };

  return (
    <>
      <div className="flex justify-between flex-wrap items-center my-5">
        <div className="sm:mb-5">
          <p className="text-orange-500 text-2xl font-semibold">All Students</p>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Medium</th>
              <th>Roll No</th>
              <th>Standard</th>
              <th>Syllabus</th>
              <th>School</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((rowData, index) => (
              <tr key={index}>
                <td>
                  {rowData.firstName} {rowData.lastName}
                </td>
                <td>{rowData.medium}</td>
                <td>{rowData.rollNo}</td>
                <td>{rowData.standard}</td>
                <td>{rowData.syllabus}</td>
                <td>{rowData?.school?.name}</td>
                <td>{rowData?.school?.district}</td>
                
                <td>
                  <div
                    onClick={() => {
                      setSelectedStudent(rowData._id);
                      setShowModal(true);
                    }}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    <PiPasswordDuotone className="mr-2" />
                    Reset Password
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="px-4 py-6">
                <div className="flex items-start justify-between">
                  <div className="text-lg font-semibold">Reset Password</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <form
                    onSubmit={handleResetPassword}
                    className="bg-gray-200 rounded-lg p-5 lg:w-1/2 mx-auto"
                  >
                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Reset Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-5"
                        type="submit"
                      >
                        {" "}
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllStudents;
