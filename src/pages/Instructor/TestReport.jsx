import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, getPercentage } from "../../constants";

const TestReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const tableData = [
    {
      name: "John",
      rollNo: "101",
      standard: "10",
      medium: "English",
      subject: "Mathematics",
      scored: 560,
      totalmarks: 600,
      percentage: 98,
    },
    {
      name: "Jane",
      rollNo: "102",
      standard: "9",
      medium: "English",
      subject: "Science",
      scored: 560,
      totalmarks: 600,
      percentage: 98,
    },
  ];

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = tableData.filter((item) =>
      Object.values(item).some(
        (field) =>
          typeof field === "string" && field.toLowerCase().includes(searchTerm)
      )
    );
    setFilteredData(filtered);
  };

  const dataToRender = filteredData || tableData;

  const [testReport, setTestReport] = useState([]);
  const [school, setSchool] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("NO");
  const [syllabus, setSyllabus] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState("NO");
  const [medium, setMedium] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("NO");
  const [fillterSchool, setFillterSchool] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("NO");
  const fetchSchoolTestReport = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}instructor/getByUserId/${sessionStorage.getItem("user_id")}`
      );
      console.log(res.data);
      setSchool(res.data.intructorDoc?.school);
      fetchTestReportbySchoolId(res.data.intructorDoc?.school?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTestReportbySchoolId = async (schoolId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}studentTest/testReportForSchool/${schoolId}`
      );
      console.log(res.data);
      setTestReport(res.data.testReport);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTestReport = async () => {
    if (sessionStorage.getItem("role") == "INSTRUCTOR") {
      fetchSchoolTestReport();
    } else {
      try {
        const res = await axios.get(`${BASE_URL}studentTest/testReport`);
        console.log(res.data);
        setTestReport(res.data.testReport);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchTestReport();
    fetchDistric();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchDistric = async () => {
    try {
      const res = await axios.get(`${BASE_URL}school/getDistricts`);
      console.log(res.data.districts);
      setDistricts(res.data.districts);
      setSyllabus(res.data.syllabus);
      setMedium(res.data.medium);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSchools = async (district, syllabus, medium) => {
    try {
      const res = await axios.post(`${BASE_URL}school/getSchool`, {
        district,
        syllabus,
        medium,
      });
      setFillterSchool(res.data.schools);
      console.log(res.data.schools);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      selectedDistrict != "NO" &&
      selectedSyllabus != "NO" &&
      selectedMedium != "NO"
    ) {
      fetchSchools(selectedDistrict, selectedSyllabus, selectedMedium);
    }
  }, [selectedDistrict, selectedSyllabus, selectedMedium]);

  const applyFilter = () => {
    console.log(selectedSchool);
    fetchTestReportbySchoolId(selectedSchool);
    toggleModal();
  };

  return (
    <>
      <div className="flex justify-between items-center my-5">
        <div>
          <p className="text-orange-500 text-2xl font-semibold">
            Student progress
          </p>
          <p className="text-lg font-semibold">Test Report</p>
        </div>
        <div>
          {/* <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-orange-500 rounded-lg bg-gray-50  "
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                required
              />
              <button
                type="submit"
                className="text-orange-500 hover:text-white absolute end-2.5 bottom-2.5 border border-orange-500 hover:bg-orange-500  font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form> */}
          <button
            onClick={toggleModal}
            className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white  font-bold py-1 px-4 rounded"
          >
            Filter
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr className="whitespace-nowrap">
              <th>Name</th>
              <th>Roll no</th>
              <th>Standard</th>
              <th>Medium</th>
              <th>School</th>
              <th>District</th>
              <th>Test </th>
              <th>Scored marks</th>
              <th>Total marks</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {testReport.map((rowData, index) => (
              <tr key={index}>
                <td>
                  {rowData?.student?.firstName} {rowData?.student?.lastName}
                </td>
                <td>{rowData?.student?.rollNo}</td>
                <td>{rowData?.student?.standard}</td>
                <td>{rowData?.student?.medium}</td>
                <td>{rowData?.school?.name}</td>
                <td>{rowData?.school?.district}</td>
                <td>{rowData?.test?.name}</td>
                <td>{rowData?.marks}</td>
                <td>{rowData?.test?.totalMarks}</td>
                <td>
                  {getPercentage(rowData?.marks, rowData?.test?.totalMarks)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label
                        htmlFor="District"
                        className="block text-sm font-medium text-gray-700"
                      ></label>
                      <select
                        id="District"
                        name="District"
                        onChange={(e) => {
                          setSelectedDistrict(e.target.value);
                          console.log(e.target.value);
                        }}
                        className="mt-1 block w-full pl-3 pr-10  py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option>Select District</option>

                        {districts?.map((district, index) => {
                          return (
                            <option key={index} value={district}>
                              {district}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="Medium"
                        className="block text-sm font-medium text-gray-700"
                      ></label>
                      <select
                        id="Medium"
                        name="Medium"
                        onChange={(e) => {
                          setSelectedMedium(e.target.value);
                          console.log(e.target.value);
                        }}
                        className="mt-1 block w-full pl-3 pr-10  py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option>Select Medium</option>

                        {medium?.map((medium, index) => {
                          return (
                            <option key={index} value={medium}>
                              {medium}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="Syllabus"
                        className="block text-sm font-medium text-gray-700"
                      ></label>
                      <select
                        id="Syllabus"
                        name="Syllabus"
                        onChange={(e) => {
                          setSelectedSyllabus(e.target.value);
                          console.log(e.target.value);
                        }}
                        className="mt-1 block w-full pl-3 pr-10  py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option>Select Syllabus</option>

                        {syllabus?.map((syllabuss, index) => {
                          return (
                            <option key={index} value={syllabuss}>
                              {syllabuss}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="school"
                        className="block text-sm font-medium text-gray-700"
                      ></label>
                      <select
                        id="school"
                        name="school"
                        onChange={(e) => {
                          setSelectedSchool(e.target.value);
                          console.log(e.target.value);
                        }}
                        className="mt-1 block w-full pl-3 pr-10  py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option>Select School</option>

                        {fillterSchool?.map((school, index) => {
                          return (
                            <option key={index} value={school?._id}>
                              {school?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={applyFilter}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Apply Filter
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestReport;
