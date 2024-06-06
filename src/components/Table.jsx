import { useState, useEffect } from "react";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";

const Table = ({ data, columns, label , fetchData}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownFilters, setDropdownFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({});

  const [editSyllabus, setEditSyllabus] = useState(false);
  const [editMedium, setEditMedium] = useState(false);
  const [editSubject, setEditSubject] = useState(false);

  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [selectedMedium, setSelectedMedium] = useState(null);

  const handleEditModal = (rowData) => {
    if (label === "SYLLABUS") {
      setEditSyllabus(true);
      setSelectedSyllabus(rowData);
    } else if (label === "MEDIUM") {
      setEditMedium(true);
      setSelectedMedium(rowData);
    } else {
      setEditSubject(true);
    }
  };

  useEffect(() => {
    const initialFilters = columns.reduce((acc, column) => {
      if (column.filterable) {
        const uniqueValues = [
          ...new Set(data.map((item) => item[column.accessor])),
        ];
        return { ...acc, [column.accessor]: uniqueValues };
      }
      return acc;
    }, {});
    setDropdownFilters(initialFilters);
  }, [data, columns]);

  useEffect(() => {
    let newFilteredData = data;

    // Apply each filter
    for (const key in filters) {
      if (filters[key]) {
        newFilteredData = newFilteredData.filter(
          (item) => item[key] === filters[key]
        );
      }
    }

    // Apply search term
    if (searchTerm) {
      newFilteredData = newFilteredData.filter((rowData) =>
        Object.values(rowData)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(newFilteredData);
  }, [data, filters, searchTerm]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleCustomAction = (rowData, accessor) => {
    if (typeof accessor === "function") {
      return accessor(rowData);
    }
    return rowData[accessor];
  };

  const handelSyllabusEdit = async (e) => {
    e.preventDefault();
    const reqBody = {
      name: selectedSyllabus.name,
      reference: selectedSyllabus.reference,
      id: selectedSyllabus._id,
    };
    try {
      const res = await axios.post(`${BASE_URL}syllabus/edit`, reqBody);
      console.log(res.data);
      toast.success("Syllabus edited successfully");
      setFilteredData(
        filteredData.map((item) =>
          item.id === selectedSyllabus._id ? res.data : item
        )
      );
      setEditSyllabus(false);
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Syllabus could not be edited");
    }
  };

  return (
    <>
      {/* Search form */}
      <form className="max-w-md my-5">
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
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search ..."
            required
          />
        </div>
      </form>

      {/* Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {/* Column headers */}
              {columns.map(({ label, accessor, filterable }) => (
                <th key={label} className="cursor-pointer">
                  <div className="flex flex-col justify-center items-center">
                    <span>{label}</span>
                    {/* Dropdown filter */}
                    {filterable && (
                      <select
                        onChange={(e) =>
                          handleFilterChange(accessor, e.target.value)
                        }
                        className="mt-1 p-1 border rounded"
                      >
                        <option value="">All</option>
                        {dropdownFilters[accessor]?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Table rows */}
            {filteredData.map((rowData, index) => (
              <tr key={index}>
                {/* Table data cells */}
                {columns.map(({ accessor }) => (
                  <td key={accessor}>
                    {handleCustomAction(rowData, accessor)}
                  </td>
                ))}
                <td>
                  <div className="flex space-x-5 justify-center">
                    <button
                      onClick={() => handleEditModal(rowData)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <CiEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(rowData)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDeleteOutline className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Syllabus */}
        {editSyllabus && (
          <div className="flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handelSyllabusEdit}>
                <label htmlFor="name">Board Name :</label>
                <br />
                <input
                  type="text"
                  id="name"
                  placeholder="Board Name"
                  value={selectedSyllabus?.name}
                  onChange={(e) =>
                    setSelectedSyllabus({
                      ...selectedSyllabus,
                      name: e.target.value,
                    })
                  }
                  className="mt-2 w-full bg-gray-100 px-4 py-2 rounded-md"
                />

                <label htmlFor="ref">Reference :</label>
                <br />
                <input
                  type="text"
                  id="ref"
                  placeholder="Reference"
                  value={selectedSyllabus?.reference}
                  onChange={(e) =>
                    setSelectedSyllabus({
                      ...selectedSyllabus,
                      reference: e.target.value,
                    })
                  }
                  className="mt-2 w-full bg-gray-100 px-4 py-2 rounded-md"
                />

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setEditSyllabus(false)}
                    className="bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold text-sm"
                  >
                    Edit Board
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Medium */}
        {editMedium && (
          <div className="flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form>
                <label htmlFor="name">Board Name :</label>
                <br />
                <input
                  type="text"
                  id="name"
                  placeholder="Board Name"
                  value={selectedMedium?.name}
                  className="mt-2 w-full bg-gray-100 px-4 py-2 rounded-md"
                />

                <label htmlFor="ref">Reference :</label>
                <br />
                <input
                  type="text"
                  id="ref"
                  placeholder="Reference"
                  value={selectedMedium?.reference}
                  className="mt-2 w-full bg-gray-100 px-4 py-2 rounded-md"
                />

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setShowSyllabus(false)}
                    className="bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold text-sm"
                  >
                    Edit Board
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
