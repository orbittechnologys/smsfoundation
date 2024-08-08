import React from 'react';

const Table = ({ data, columns, label, dropdownData }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{label}</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} className="py-2 px-4 bg-gray-200">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  {column.isDropdown ? (
                    <select className="bg-gray-100 px-2 py-1 rounded">
                      {dropdownData[column.accessor].map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  ) : (
                    row[column.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
