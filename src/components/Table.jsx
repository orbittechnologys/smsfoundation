/* eslint-disable react/prop-types */
import {useState} from 'react';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { formatDate } from '../constants';

const Table = ({data, columns , label}) => {
  

    const [searchTerm,setSearchTerm] = useState("");

    const [sortConfig, setSortConfig] = useState({
      key: "name",
      direction: "ascending",
    });

    const handleSortingChange = (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    const sortedData = [...data].sort((a, b) => {
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

    const filteredData = sortedData.filter((rowData) => {
      // Combine all your rowData values into a single string and then check if the search term is included.
      // This allows for a very basic "global" search across all fields.
      return Object.values(rowData).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <>

<form className="max-w-md  my-5">
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

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {columns?.map(({ label, accessor, sortable }) => (
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
            
            {label=="SYLLABUS" && filteredData.map((rowData, index) => (
              <tr key={index}>
                {/* {columns?.map(({accessor})=> {
                  return(
                    <td key={rowData?._id}>{rowData[accessor]}</td>
                  )
                })} */}
                <td>{rowData?.name}</td>
                <td>{rowData?.reference}</td>
                <td>{formatDate(rowData?.createdAt)}</td>
              </tr>
            ))}

{label=="MEDIUM" && filteredData.map((rowData, index) => (
              <tr key={index}>
                {/* {columns?.map(({accessor})=> {
                  return(
                    <td key={rowData?._id}>{rowData[accessor]}</td>
                  )
                })} */}
                <td>{rowData?.name}</td>
                <td>{rowData?.reference}</td>
                <td>{formatDate(rowData?.createdAt)}</td>
              </tr>
            ))}

{label=="SUBJECT" && filteredData.map((rowData, index) => (
              <tr key={index}>
                {/* {columns?.map(({accessor})=> {
                  return(
                    <td key={rowData?._id}>{rowData[accessor]}</td>
                  )
                })} */}
                <td>{rowData?.name}</td>
                <td>{rowData?.syllabus}</td>
                <td>{rowData?.medium}</td>
                <td>{rowData?.standard}</td>
                <td>{rowData?.noOfChapter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default Table