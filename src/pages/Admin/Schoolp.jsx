import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { Link } from "react-router-dom";

const Schoolp = () => {
  const [allSchools, setAllSchools] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const getAllSchools = async () => {
    try {
      const res = await axios.get(`${BASE_URL}school/getAllSchools`);
      setAllSchools(res.data.schools);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSchools();
  }, []);

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

  const columns = [
    { label: "School Name", accessor: "name", sortable: true },
    { label: "Principal Name", accessor: "principalName", sortable: true },
    { label: "Address", accessor: "address", sortable: true },
    { label: "District", accessor: "district", sortable: true },
    { label: "Pincode", accessor: "pincode", sortable: true },
    { label: "Syllabus", accessor: "syllabus", sortable: true },
    { label: "Medium", accessor: "medium", sortable: true },
    { label: "Internet", accessor: "internet", sortable: true },
  ];

  return (
    <>
      {/* Your existing JSX */}
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
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedSchools.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.name}</td>
                <td>{rowData.principalName}</td>
                <td>{rowData.address}</td>
                <td>{rowData.district}</td>
                <td>{rowData.pincode}</td>
                <td>{rowData.syllabus}</td>
                <td>{rowData.medium}</td>
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

export default Schoolp;
