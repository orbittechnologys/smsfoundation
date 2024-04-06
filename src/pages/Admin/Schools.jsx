import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuArrowUpDown } from "react-icons/lu";

const Schools = () => {
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

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedSchools = [...allSchools].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <div className="flex justify-between flex-wrap items-center my-5">
        <div className="sm:mb-5">
          <p className="text-orange-500 text-2xl font-semibold">All Schools</p>
        </div>
        <div>
          <Link to="/admin/AddSchool">
            <button
              type="button"
              className="mt-5 text-orange-500 font-semibold hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
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
              {/* <th>School Name</th> */}
              <th className="flex justify-center items-center">
                School Name{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  <LuArrowUpDown className="ml-2" />
                </span>
              </th>
              <th>Principal Name</th>
              <th>Address</th>
              <th>District</th>
              <th>Pincode</th>
              <th>Syllabus</th>
              <th>Medium</th>
              <th>Internet</th>
            </tr>
          </thead>
          <tbody>
            {/* {allSchools.map((rowData, index) => (
              <tr key={index}> */}
            {sortedSchools.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.name}</td>
                <td>{rowData.principalName}</td>
                <td>{rowData.address}</td>
                <td>{rowData.district}</td>
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
