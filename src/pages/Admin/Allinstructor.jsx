import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { PiPasswordDuotone } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Allinstructor = () => {
  const [allInstructor, setAllInstructor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const getAllInstructor = async () => {
    try {
      const res = await axios.get(`${BASE_URL}instructor/getAll`);
      console.log(res.data.instructors);
      setAllInstructor(res.data.instructors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInstructor();
  }, []);

  const handleResetPassword = (instructorId) => {
    try {
      const reqbody = {
        instructorId: instructorId,
        newPassword: newPassword,
      };
      const res = axios.post(`${BASE_URL}instructor/resetPassword`, reqbody);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    setSelectedInstructorId(instructorId);
    console.log(instructorId);
    setShowModal(true);
  };

  return (
    <>
      <div className="flex justify-between flex-wrap items-center my-5">
        <div className="sm:mb-5">
          <p className="text-orange-500 text-2xl font-semibold">
            All Instructors
          </p>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>

              <th>Medium</th>
              <th>Email</th>
              <th>Passoword Rest</th>
            </tr>
          </thead>
          <tbody>
            {allInstructor.map((rowData, index) => (
              <tr key={index}>
                <td>
                  {rowData.firstName} {rowData.lastName}
                </td>
                <td>{rowData.medium}</td>
                <td>{rowData.email}</td>
                <td>
                  <div
                    onClick={() => handleResetPassword(rowData._id)}
                    className="cursor-pointer flex items-center"
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
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Create New password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <FaEye className="w-5 h-5 text-gray-500" />
                        ) : (
                          <FaEyeSlash className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Allinstructor;
