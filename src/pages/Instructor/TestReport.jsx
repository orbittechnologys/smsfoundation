import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, getPercentage } from "../../constants";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const TestReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
    key2: "",
  });

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
  const [role, setRole] = useState("ADMIN");
  const fetchSchoolTestReport = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}instructor/getByUserId/${sessionStorage.getItem("user_id")}`
      );
      console.log(res.data);
      fetchTestReportbySchoolId(res.data.instructorDoc?.school?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTestReportbySchoolId = async (schoolId) => {
    if (schoolId) {
      setSchool(schoolId);
      try {
        const res = await axios.get(
          `${BASE_URL}studentTest/testReportForSchool/${schoolId}`
        );
        console.log(res.data);
        setTestReport(res.data.testReport);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchTestReport = async () => {
    if (sessionStorage.getItem("role") == "INSTRUCTOR") {
      fetchSchoolTestReport();
      setRole("INSTRUCTOR");
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

  const triggerCsvDownload = async (role) => {
    try {
      if (role == "ADMIN") {
        const res = await axios.get(`${BASE_URL}studentTest/getCSV`, {
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
          `testReport${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getHours()}:${date.getMinutes()}.csv`
        ); // or dynamically set the filename based on content-disposition header
        document.body.appendChild(link); // Append to the document
        link.click(); // Programmatically click the link to trigger the download

        // Clean up: remove the link and revoke the object URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        console.log(school);
        const res = await axios.get(
          `${BASE_URL}studentTest/testReportCSVForSchool/${school}`,
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
          `testReportSchool${date.getDate()}-${
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

  const columns = [
    { label: "Name", accessor: "student", aftab: "firstName", sortable: true },
    { label: "Roll No", accessor: "student", aftab: "rollNo", sortable: true },
    {
      label: "Standard",
      accessor: "student",
      aftab: "standard",
      sortable: true,
    },
    { label: "Medium", accessor: "student", aftab: "medium", sortable: true },
    { label: "School", accessor: "school", aftab: "name", sortable: true },
    {
      label: "District",
      accessor: "school",
      aftab: "district",
      sortable: true,
    },
    { label: "Test", accessor: "test", aftab: "name", sortable: true },
    { label: "Scored Marks", accessor: "marks", sortable: true },
    {
      label: "Total Marks",
      accessor: "test",
      aftab: "totalMarks",
      sortable: true,
    },
    {
      label: "Percentage",
      accessor: "percentage",
      sortable: true,
    },
  ];

  const handleSortingChange = (key, key2) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, key2, direction });
  };

  const sortedSchools = [...testReport].sort((a, b) => {
    const valueAContainsKey2 = sortConfig.key2 ? true : false;

    let valueA = "";
    let valueB = "";

    // if(sortConfig.key == "school"){ //here we have 2 edge cases : rowData?.school?.name / rowData?.student?.school?.name
    //   let type = typeof a[sortConfig.key]
    //   console.log(type, sortConfig.key2)
    //   if(type === undefined && sortConfig.key2 == "name"){ // if we don't have a school object immediately i,e rowData.school we do modification
    //     console.log("I am here")
    //     valueA =
    //   valueAContainsKey2 && typeof a?.student?.school?.name  === "string"
    //   ? a?.student?.school?.name.toLowerCase().trim()
    //   : a?.student?.school?.name ;
    //       console.log(valueA);
    // valueB =
    //  valueAContainsKey2 && typeof b?.student?.school?.name  === "string"
    //     ? b?.student?.school?.name.toLowerCase().trim()
    //     : b?.student?.school?.name;

    //   }else if(!type && sortConfig.key2 == "district"){
    //     valueA =
    //   valueAContainsKey2 && typeof a[sortConfig.key][sortConfig.key2]  === "string"
    //   ? a[sortConfig.key][sortConfig.key2].toLowerCase().trim()
    //   : a[sortConfig.key];
    //       console.log(valueA);
    // valueB =
    //  valueAContainsKey2 && typeof b[sortConfig.key][sortConfig.key2] === "string"
    //     ? b[sortConfig.key][sortConfig.key2].toLowerCase().trim()
    //     : b[sortConfig.key];
    //   }
    // }else{
    valueA =
      valueAContainsKey2 &&
      typeof a[sortConfig.key][sortConfig.key2] === "string"
        ? a[sortConfig.key][sortConfig.key2].toString().toLowerCase().trim()
        : valueAContainsKey2 &&
          typeof a[sortConfig.key][sortConfig.key2] === "number"
        ? a[sortConfig.key][sortConfig.key2]
        : a[sortConfig.key];

    valueB =
      valueAContainsKey2 &&
      typeof b[sortConfig.key][sortConfig.key2] === "string"
        ? b[sortConfig.key][sortConfig.key2].toString().toLowerCase().trim()
        : valueAContainsKey2 &&
          typeof b[sortConfig.key][sortConfig.key2] === "number"
        ? b[sortConfig.key][sortConfig.key2]
        : b[sortConfig.key];

    // }
    console.log(sortConfig.key, sortConfig.key2);
    console.log(valueA);
    console.log(valueB);

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
      .includes(searchTerm);
    let res2 = rowData.school
      ? Object.values(rowData.school)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm)
      : false;
    let res3 = rowData.student
      ? Object.values(rowData.student)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm)
      : false;
    let res4 = rowData.test
      ? Object.values(rowData.test).join(" ").toLowerCase().includes(searchTerm)
      : false;

    return res ? res : res2 ? res2 : res3 ? res3 : res4 ? res4 : false;
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

      <div className="flex flex-wrap justify-between items-center my-5">
        <div>
          <p className="text-orange-500 text-2xl font-semibold">
            Student progress
          </p>
          <p className="text-lg font-semibold">Test Report</p>
        </div>
        <div className="flex flex-row justify-evenly lg:w-fit md:w-fit w-full">
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
            onClick={() => triggerCsvDownload(role)}
            className="m-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white  font-bold py-1 px-4 rounded"
          >
            Download CSV
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map(({ label, accessor, sortable, aftab }) => (
                <th
                  key={accessor}
                  onClick={
                    sortable ? () => handleSortingChange(accessor, aftab) : null
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
            {/* <tr className="whitespace-nowrap">
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
            </tr> */}
          </thead>
          <tbody>
            {filteredSchools.map((rowData, index) => (
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
                <td>{rowData?.test?.name}</td>
                <td>{rowData?.marks}</td>
                <td>{rowData?.test?.totalMarks}</td>
                <td>{rowData?.percentage}%</td>
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
