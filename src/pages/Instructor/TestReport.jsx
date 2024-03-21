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

  const fetchTestReport = async () => {
    try {
      const res = await axios.get(`${BASE_URL}studentTest/testReport`);
      console.log(res.data);
      setTestReport(res.data.testReport);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestReport();
  }, []);

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
    </>
  );
};

export default TestReport;
