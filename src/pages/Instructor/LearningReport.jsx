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

  const [learningReport,setLearningReport] = useState([]);

  const [school,setSchool] = useState(null);

  const fetchSchoolLearningReport = async () => {
    console.log('Fetching learning report');
    try {
      const res = await axios.get(`${BASE_URL}instructor/getByUserId/${sessionStorage.getItem('user_id')}`);
      console.log(res.data);
      setSchool(res.data.instructorDoc?.school);

      const res2 = await axios.get(`${BASE_URL}subjectTime/getLearningReportForSchool/${res.data.instructorDoc?.school?._id}`);
      console.log(res2.data);
      setLearningReport(res2.data.subjectReport);
    } catch (error) {
      console.log(error);
    }
   
  }

  
  const fetchLearningReport = async () => {
    if(sessionStorage.getItem('role') == 'INSTRUCTOR'){
      fetchSchoolLearningReport();
    }else{
      try {
        const res = await axios.get(`${BASE_URL}subjectTime/getLearningReport`);
        console.log(res.data);
        setLearningReport(res.data.subjectReport);
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  useEffect(()=> {
    fetchLearningReport();
  },[])

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

  return (
    <>
      <div className="flex justify-between items-center my-5">
        <div>
          <p className="text-orange-500 text-2xl font-semibold">
            Student progress
          </p>
          <p className="text-lg font-semibold">Learning Report</p>
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
                <td>{rowData?.student?.firstName} {rowData?.student?.lastName}</td>
                <td>{rowData?.student?.rollNo}</td>
                <td>{rowData?.student?.standard}</td>
                <td>{rowData?.student?.medium}</td>
                <td>{rowData?.school?.name}</td>
                <td>{rowData?.school?.district}</td>
                <td>{rowData?.subject?.name}</td>
                <td>{convertSeconds(rowData?.time)}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LearningReport;
