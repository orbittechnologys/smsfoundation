import React, { useEffect, useState } from "react";
import sfLogo from "../assets/logoflex.png";
import { Outlet } from "react-router";
import { CiUser } from "react-icons/ci";
import axios from "axios";
import { BASE_URL } from "../constants";

const Navbar = () => {
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    const userId = sessionStorage.getItem("user_id");
    console.log(userId);
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${userId}`
      );
      console.log(res.data);
      setStudent(res.data.studentDoc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center px-10 py-3 bg-gray-100 w-full">
        <div className="flex justify-center items-center">
          <div>
            <img src={sfLogo} alt="logo" className="h-10" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <div className="flex justify-center items-center gap-5">
            <span>Language</span>
            <button>English</button>
          </div>
          <div className="flex justify-center items-center gap-2">
            <CiUser />
            <div className="flex justify-center items-center gap-1">
              <span> {student?.firstName}</span>
              <span> {student?.lastName}</span>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
