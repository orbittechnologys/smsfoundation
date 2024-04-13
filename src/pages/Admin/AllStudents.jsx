import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const AllStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentd, setSelectedStudent] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("NONE");
  const [instructor, setInstructor] = useState(null);

  const fetchStudentsBySchool = async (schoolId) => {
    if (schoolId) {
      try {
        const res = await axios.get(
          `${BASE_URL}student/getStudentsBySchool/${schoolId}`
        );
        setAllStudents(res.data.students);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [allSchools, setAllSchools] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };

  const getAllStudents = async () => {
    console.log(role);
    if (sessionStorage.getItem("role") == "ADMIN") {
      try {
        const res = await axios.get(`${BASE_URL}student/getAll`);
        console.log(res.data.students);
        setAllStudents(res.data.students);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchStudentsByInstructor = async (instructorId) => {
    try {
      if(instructorId){
        const res = await axios.get(
          `${BASE_URL}instructor/fetchStudents/${instructorId}`
        );
        setAllStudents(res.data.students);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchInstructor = async () => {
    try {
      const userId = sessionStorage.getItem("user_id");
      setRole(sessionStorage.getItem("role"));
      if (sessionStorage.getItem("role") == "ADMIN") {
        getAllStudents();
      } else {
        const res = await axios.get(
          `${BASE_URL}instructor/getByUserId/${userId}`
        );
        console.log(res.data.instructorDoc.school);
        setInstructor(res.data.instructorDoc.school);
        // fetchStudentsBySchool(res.data.instructorDoc.school._id);
        fetchStudentsByInstructor(res.data.instructorDoc?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
    fetchInstructor();
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const reqbody = {
      studentId: selectedStudentd?._id,
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

  const columns = [
    { label: "Name", accessor: "firstName", sortable: true },
    { label: "Medium", accessor: "medium", sortable: true },
    { label: "Roll No", accessor: "rollNo", sortable: true },
    { label: "Standard", accessor: "standard", sortable: true },
    { label: "Syllabus", accessor: "syllabus", sortable: true },
    { label: "School", accessor: "school?.name", sortable: true },
    { label: "District", accessor: "school?.district", sortable: true },
    { label: "Actions", accessor: "Actions", sortable: true },
  ];

  const handleSortingChange = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedSchools = [...allStudents].sort((a, b) => {
    const valueA =
      typeof a[sortConfig.key] === "string"
        ? a[sortConfig.key].toLowerCase().trim()
        : a[sortConfig.key];
    const valueB =
      typeof b[sortConfig.key] === "string"
        ? b[sortConfig.key].toLowerCase().trim()
        : b[sortConfig.key];

    if (valueA < valueB) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredSchools = sortedSchools.filter((rowData) => {
    // Combine all your rowData values into a single string and then check if the search term is included.
    // This allows for a very basic "global" search across all fields.
    let res = Object.values(rowData)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return res
      ? res
      : rowData.school
      ? Object.values(rowData?.school)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : false;
  });

  return (
    <>
      <form className="max-w-md mx-auto my-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search ..."
            required
          />
        </div>
      </form>

      <div className="flex justify-between flex-wrap items-center my-5">
        <div className="sm:mb-5">
          <p className="text-orange-500 text-2xl font-semibold">All Students</p>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map(({ label, accessor, sortable }) => (
                <th
                  key={accessor}
                  onClick={
                    sortable ? () => handleSortingChange(accessor) : null
                  }
                  className="cursor-pointer"
                >
                  {/* {label} */}
                  <div className="flex justify-center items-center">
                    <span>{label}</span>
                    {sortConfig.key === accessor &&
                      (sortConfig.direction === "ascending" ? (
                        <FaCaretUp className="ml-1 text-sm" />
                      ) : (
                        <FaCaretDown className="ml-1 text-sm" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
            {/* <tr>
              <th>Name</th>
              <th>Medium</th>
              <th>Roll No</th>
              <th>Standard</th>
              <th>Syllabus</th>
              <th>School</th>
              <th>District</th>
              <th>Actions</th>
            </tr> */}
          </thead>
          <tbody>
            {filteredSchools.map((rowData, index) => (
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
                      setSelectedStudent(rowData);
                      setShowModal(true);
                    }}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    {/* <PiPasswordDuotone className="mr-2" /> */}
                    <button className="px-4 py-2 bg-green-600 rounded-lg text-white font-semibold">
                      Reset Password
                    </button>
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
                  <div className="border p-5 my-2 bg-gray-100">
                    <p className="">
                      {" "}
                      <span className="text-lg font-bold text-orange-500">
                        Name :
                      </span>{" "}
                      {selectedStudentd?.firstName} {selectedStudentd?.lastName}
                    </p>
                    <p>
                      {" "}
                      <span className="text-lg font-bold text-orange-500">
                        Roll No :
                      </span>{" "}
                      {selectedStudentd?.rollNo}
                    </p>
                    <p>
                      <span className="text-lg font-bold text-orange-500">
                        Class :
                      </span>{" "}
                      {selectedStudentd?.standard}
                    </p>
                  </div>
                  <form
                    onSubmit={handleResetPassword}
                    className="bg-gray-200 rounded-lg p-5 mx-auto"
                  >
                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfPassword ? "text" : "password"}
                          placeholder="Confirm new Password"
                          value={confPassword}
                          onChange={(e) => setConfPassword(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={toggleConfPasswordVisibility}
                        >
                          {showConfPassword ? (
                            <FaEye className="w-5 h-5 text-gray-500" />
                          ) : (
                            <FaEyeSlash className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    {newPassword != confPassword ? (
                      <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                        role="alert"
                      >
                        <span className="font-medium">
                          Passwords Don't match
                        </span>
                      </div>
                    ) : (
                      ``
                    )}
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
