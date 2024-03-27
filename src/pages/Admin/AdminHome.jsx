import React, { useEffect, useState } from "react";
import Slogan from "../../assets/slogan.png";
import Img2 from "../../assets/img2.png";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip as RechartsTooltip,
  YAxis,
} from "recharts";
import { TbFileImport } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants";

ChartJs.register(ArcElement, Tooltip, Legend);

const AdminHome = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [totals,setTotals] = useState({
    totalSchool:1,
    totalInstructor:1,
    totalStudents:1
  })
  const data = {
    labels: ["Registered Last Week", "Registered This Week"],
    datasets: [
      {
        label: "Schools",
        data: [100, 3],
        backgroundColor: ["#D9D9D9", "#F26651"],
        borderColor: ["#D9D9D9", "#F26651"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
  };

  const dataArray = [
    {
      name: "Java",
      student: 20,
      fees: "50$",
    },
    {
      name: "C++",
      student: 15,
      fees: "40$",
    },
    {
      name: "JavaScript",
      student: 25,
      fees: "60$",
    },
    {
      name: "Python",
      student: 18,
      fees: "45$",
    },
    {
      name: "Ruby",
      student: 10,
      fees: "35$",
    },
    {
      name: "HTML",
      student: 22,
      fees: "55$",
    },
    {
      name: "CSS",
      student: 12,
      fees: "38$",
    },
    {
      name: "Swift",
      student: 8,
      fees: "42$",
    },
    {
      name: "PHP",
      student: 17,
      fees: "48$",
    },
    {
      name: "SQL",
      student: 14,
      fees: "37$",
    },
  ];

  const fetchUser = async () => {
    const userId = sessionStorage.getItem("user_id");
    setRole(sessionStorage.getItem("role"));
    console.log(userId);
    try {
      const res = await axios.get(`${BASE_URL}user/id/${userId}`);
      console.log(res.data.userDoc);
      setUser(res.data.userDoc);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotal = async () => {
    try {
      const res = await axios.get(`${BASE_URL}school/getTotals`);
      console.log(res.data);
      setTotals(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchTotal();
  }, []);

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center my-5">
          <div>
            <h1 className="text-3xl font-semibold">
              <span className="text-orange-400">Welcome </span>

              {role === "ADMIN" && user && (
                <span>
                  {user?.username.charAt(0).toUpperCase() +
                    user?.username.slice(1)}
                </span>
              )}
            </h1>
          </div>
          <div>
            <div className="flex justify-center items-center my-5 static">
              <img src={Img2} alt="" className="h-16" />
              <img src={Slogan} alt="" className="h-16" />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
          <div className="shadow-xl rounded-2xl p-5 bg-white ">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Schools Registered</p>
              <span className="p-2 bg-gray-200 rounded-full">{totals?.totalSchool}</span>
            </div>
            <div className="flex justify-center items-center">
              <div style={{ width: "400px", height: "400px" }}>
                <Doughnut data={data} options={options} />
              </div>
            </div>
          </div>

          <div className="shadow-xl rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">Student Progress</p>
              <div>
                <select
                  id="small"
                  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#F2665166",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              ></div>
              <p className="my-2">Usage</p>
            </div>
            <div
              style={{
                width: "100%",
                height: 400,
                padding: "10px",
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
              }}
            >
              <ResponsiveContainer>
                <BarChart
                  data={dataArray}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="student" fill="#F2665166" />
                  <RechartsTooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid place-items-center">
            <div className="grid place-items-center gap-3">
              <p className="text-xl font-semibold">Schools Registered</p>
              <span className="px-10 py-1 bg-[#F1EDDF] rounded-xl font-semibold">
                {totals?.totalSchool}
              </span>
            </div>
            <div className="grid place-items-center gap-3">
              <p className="text-xl font-semibold">Students Registered</p>
              <span className="px-10 py-1 bg-[#F1EDDF] rounded-xl font-semibold">
                {totals?.totalStudents}
              </span>
            </div>
            <div className="grid place-items-center gap-3">
              <p className="text-xl font-semibold">Instructor Registered</p>
              <span className="px-10 py-1 bg-[#F1EDDF] rounded-xl font-semibold">
                {totals?.totalInstructor}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <Link to="/admin/AddSchool">
            <button
              type="button"
              className="mt-5 text-orange-500 font-semibold hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
            >
              Add School
            </button>
          </Link>
          <Link to="/admin/AddInstructor">
            <button
              type="button"
              className="mt-5 text-orange-500 font-semibold hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
            >
              Add Instructor
            </button>
          </Link>

          {/* <button
            type="button"
            className="flex bg-gray-100 justify-center items-center mt-5 text-orange-500 font-semibold hover:text-white border  hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <TbFileImport className="mr-2" />
            Import Report
          </button> */}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
