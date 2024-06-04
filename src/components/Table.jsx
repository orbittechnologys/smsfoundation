import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Table = ({ data, columns, label }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownFilters, setDropdownFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const initialFilters = columns.reduce((acc, column) => {
      const uniqueValues = [...new Set(data.map(item => item[column.accessor]))];
      return { ...acc, [column.accessor]: uniqueValues };
    }, {});
    setDropdownFilters(initialFilters);
  }, [data, columns]);

  useEffect(() => {
    let newFilteredData = data;

    // Apply each filter
    for (const key in filters) {
      if (filters[key]) {
        newFilteredData = newFilteredData.filter(item => item[key] === filters[key]);
      }
    }

    // Apply search term
    if (searchTerm) {
      newFilteredData = newFilteredData.filter(rowData =>
        Object.values(rowData)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(newFilteredData);
  }, [data, filters, searchTerm]);

  const handleFilterChange = (key, value) => {
    setFilters(prevFilters => ({
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
              {columns.map(({ label, accessor }) => (
                <th key={accessor} className="cursor-pointer">
                  <div className="flex flex-col justify-center items-center">
                    <span>{label}</span>
                    {/* Dropdown filter */}
                    {typeof accessor === "string" && (
                      <select
                        onChange={(e) => handleFilterChange(accessor, e.target.value)}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
