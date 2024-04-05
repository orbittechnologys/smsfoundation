import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";

const AllStudents = () => {
  const [allStudents, setAllStudents] = useState([]);

  const getAllStudents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}student/getAll`);
      console.log(res.data.students);
      setAllStudents(res.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
      <div className="flex justify-between flex-wrap items-center my-5">
        <div className="sm:mb-5">
          <p className="text-orange-500 text-2xl font-semibold">All Students</p>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Medium</th>
              <th>Roll No</th>
              <th>Standard</th>
              <th>Syllabus</th>
              <th>School</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((rowData, index) => (
              <tr key={index}>
                <td>
                  {rowData.firstName} {rowData.lastName}
                </td>
                <td>{rowData.medium}</td>
                <td>{rowData.rollNo}</td>
                <td>{rowData.standard}</td>
                <td>{rowData.syllabus}</td>
                <td>{rowData?.school?.name}</td>
                <td>{rowData?.school?.district}</td>
                <td> <button className="font-semibold text-white bg-green-600 px-3 py-2 rounded-lg">Reset Password</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllStudents;
