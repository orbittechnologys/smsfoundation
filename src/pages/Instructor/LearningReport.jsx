import React, { useEffect, useState } from "react";
import "./Table.css";
import axios from "axios";
import { BASE_URL, convertSeconds } from "../../constants";

const LearningReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const tableData = [
    {
      name: "John",
      rollNo: "101",
      standard: "10",
      medium: "English",
      subject: "Mathematics",
      timeSpent: "2 hours",
      timeTaken: true,
    },
    {
      name: "Jane",
      rollNo: "102",
      standard: "9",
      medium: "English",
      subject: "Science",
      timeSpent: "1.5 hours",
      timeTaken: false,
    },
  ];

  const [learningReport, setLearningReport] = useState([]);
  const [school, setSchool] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("NO");
  const [syllabus, setSyllabus] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState("NO");
  const [medium, setMedium] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("NO");
  const [fillterSchool, setFillterSchool] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("NO");
  const [role, setRole] = useState("ADMIN");

  const fetchSchoolLearningReport = async () => {
    console.log("Fetching learning report");
    try {
      const res = await axios.get(
        `${BASE_URL}instructor/getByUserId/${sessionStorage.getItem("user_id")}`
      );
      console.log(res.data);
      setSchool(res.data.instructorDoc?.school);
      // const res2 = await axios.get(`${BASE_URL}subjectTime/getLearningReportForSchool/${res.data.instructorDoc?.school?._id}`);
      // console.log(res2.data);
      // setLearningReport(res2.data.subjectReport);
      fetchTestReportbySchoolId(res.data.instructorDoc?.school?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTestReportbySchoolId = async (schoolId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}subjectTime/getLearningReportForSchool/${schoolId}`
      );
      console.log(res.data);
      setLearningReport(res.data.subjectReport);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLearningReport = async () => {
    if (sessionStorage.getItem("role") == "INSTRUCTOR") {
      fetchSchoolLearningReport();
      setRole("INSTRUCTOR");
    } else {
      try {
        const res = await axios.get(`${BASE_URL}subjectTime/getLearningReport`);
        console.log(res.data);
        setLearningReport(res.data.subjectReport);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchLearningReport();
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

  const triggerCsvDownload = async (role) => {
    try {
      if (role == "ADMIN") {
        const res = await axios.get(`${BASE_URL}subjectTime/getCSV`, {
          responseType: "blob",
        });
        const blob = res.data;
        const downloadUrl = window.URL.createObjectURL(blob);
        // Create a temporary anchor element and trigger a download
        const link = document.createElement("a");
        link.href = downloadUrl;
        const date = new Date();

        link.setAttribute(
          "download",
          `subjectReport${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getHours()}:${date.getMinutes()}.csv`
        ); // or dynamically set the filename based on content-disposition header
        document.body.appendChild(link); // Append to the document
        link.click(); // Programmatically click the link to trigger the download

        // Clean up: remove the link and revoke the object URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        const res = await axios.get(
          `${BASE_URL}subjectTime/learningReportCSVForSchool/${school?._id}`,
          {
            responseType: "blob",
          }
        );
        const blob = res.data;
        const downloadUrl = window.URL.createObjectURL(blob);
        // Create a temporary anchor element and trigger a download
        const link = document.createElement("a");
        link.href = downloadUrl;
        const date = new Date();

        link.setAttribute(
          "download",
          `subjectReportSchool${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getHours()}:${date.getMinutes()}.csv`
        ); // or dynamically set the filename based on content-disposition header
        document.body.appendChild(link); // Append to the document
        link.click(); // Programmatically click the link to trigger the download

        // Clean up: remove the link and revoke the object URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between flex-wrap items-center my-5">
        <div>
          <p className="text-orange-500 text-2xl font-semibold">
            Student progress
          </p>
          <p className="text-lg font-semibold">Learning Report</p>
        </div>
        <div className="flex flex-row justify-evenly lg:w-fit md:w-fit w-full lg:my-0 sm:my-5">
          {role != "INSTRUCTOR" ? (
            <button
              onClick={toggleModal}
              className="m-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white  font-bold py-1 px-4 rounded"
            >
              Filter
            </button>
          ) : (
            ``
          )}
          <button
            className="m-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white  font-bold py-1 px-4 rounded"
            onClick={() => triggerCsvDownload(role)}
          >
            Download CSV
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll no</th>
              <th>Standard</th>
              <th>Medium</th>
              <th>School</th>
              <th>District</th>
              <th>Subject</th>
              <th>Time Spent</th>
            </tr>
          </thead>
          <tbody>
            {learningReport?.map((rowData, index) => (
              <tr key={index}>
                <td>
                  {rowData?.student?.firstName} {rowData?.student?.lastName}
                </td>
                <td>{rowData?.student?.rollNo}</td>
                <td>{rowData?.student?.standard}</td>
                <td>{rowData?.student?.medium}</td>
                {rowData?.school ? (
                  <td>{rowData?.school?.name}</td>
                ) : (
                  <td>{rowData?.student?.school?.name}</td>
                )}

                {rowData?.school ? (
                  <td>{rowData?.school?.district}</td>
                ) : (
                  <td>{rowData?.student?.school?.district}</td>
                )}
                <td>{rowData?.subject?.name}</td>
                <td>{convertSeconds(rowData?.time)}</td>
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

export default LearningReport;
