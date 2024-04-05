import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";

const Allinstructor = () => {
  const [allInstructor, setAllInstructor] = useState([]);

  const getAllInstructor = async () => {
    try {
      const res = await axios.get(`${BASE_URL}instructor/getAll`);
      console.log(res.data.instructors);
      setAllInstructor(res.data.instructors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInstructor();
  }, []);

  return (
    <>
      <div className="flex justify-between flex-wrap items-center my-5">
        <div className="sm:mb-5">
          <p className="text-orange-500 text-2xl font-semibold">
            All Instructors
          </p>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Medium</th>
              <th>School</th>
              <th>District</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allInstructor.map((rowData, index) => (
              <tr key={index}>
                <td>
                  {rowData.firstName} {rowData.lastName}
                </td>
                
                <td>{rowData.email}</td>
                <td>{rowData?.school?.medium}</td>
                <td>{rowData?.school?.name}</td>
                <td>{rowData?.school?.district}</td>
                <td>{rowData?.school?.address}</td>
                <td> <button className="font-semibold text-white bg-green-600 px-3 py-2 rounded-lg">Reset Password</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Allinstructor;
