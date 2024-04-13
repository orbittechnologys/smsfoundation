import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const Schools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allSchools, setAllSchools] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const getAllSchools = async () => {
    try {
      const res = await axios.get(`${BASE_URL}school/getAllSchools`);
      console.log(res.data.schools);
      setAllSchools(res.data.schools);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSchools();
  }, []);

  const columns = [
    { label: "School Name", accessor: "name", sortable: true },
    { label: "Principal Name", accessor: "principalName", sortable: true },
    { label: "Address", accessor: "address", sortable: true },
    { label: "District", accessor: "district", sortable: true },
    {label:"State",accessor:"state",sortable:true},
    { label: "Pincode", accessor: "pincode", sortable: true },
    { label: "Board", accessor: "syllabus", sortable: true },
    { label: "Medium", accessor: "medium", sortable: true },
    { label: "Internet", accessor: "internet", sortable: true },
  ];

  const handleSortingChange = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedSchools = [...allSchools].sort((a, b) => {
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
    return Object.values(rowData)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const handleCSVdownload = async () => {
  console.log(' i am here')
    try {
      const res = await axios.get(
        `${BASE_URL}school/getSchoolsCSV`,
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
        `AllSchools${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getHours()}:${date.getMinutes()}.csv`
      ); // or dynamically set the filename based on content-disposition header
      document.body.appendChild(link); // Append to the document
      link.click(); // Programmatically click the link to trigger the download
  
      // Clean up: remove the link and revoke the object URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.log(error);
    }


  }

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
          <p className="text-orange-500 text-2xl font-semibold">All Schools</p>
        </div>
        <div>
          <button 
          type="button"
          onClick={() => handleCSVdownload()}
          className="mt-5 text-orange-500 font-semibold hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 ">
            Download CSV
          </button>
          <Link to="/admin/AddSchool">
            <button
              type="button"
              className="mt-5 text-orange-500 font-semibold hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Add School
            </button>
          </Link>
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
          </thead>
          <tbody>
            {/* {allSchools.map((rowData, index) => (
              <tr key={index}> */}
            {filteredSchools.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.name}</td>
                <td>{rowData.principalName}</td>
                <td>{rowData.address}</td>
                <td>{rowData.district}</td>
                <td>{rowData?.state}</td>
                <td>{rowData.pincode}</td>
                <td>{rowData.syllabus}</td>
                <td>{rowData.medium}</td>
                {/* <td>{rowData.internet}</td> */}
                <td>
                  <span
                    className={`rounded-2xl px-5 py-1 ${
                      rowData.internet ? "bg-green-300" : "bg-red-300"
                    }`}
                  >
                    {rowData.internet ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Schools;
