import React, { useEffect, useState } from "react";
import Slogan from "../../assets/slogan.png";
import Img2 from "../../assets/img2.png";
import Expimg from "../../assets/export 1.png";
import Uploadimg from "../../assets/file-upload 1.png";
import Vresult from "../../assets/result 1.png";
import Cariculamv from "../../assets/curriculum-vitae 1.png";
import syncLogo from '../../assets/database-management.png';
import axios from "axios";
import { BASE_URL, SYNC_URL } from "../../constants";
import { useNavigate } from "react-router";
import LoadingOverlay from "react-loading-overlay";

const InstHome = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [school, setSchool] = useState(null);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchInstructorSchool = async (userId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}instructor/getByUserId/${userId}`
      );
      console.log(res.data);
      setSchool(Array.isArray(res.data.instructorDoc?.school) ? res.data.instructorDoc?.school[0]?._id : "");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    const userId = localStorage.getItem("user_id");
    setRole(localStorage.getItem("role"));
    console.log(userId);
    try {
      const res = await axios.get(`${BASE_URL}user/id/${userId}`);
      fetchInstructorSchool(userId);
      console.log(res.data.userDoc);
      setUser(res.data.userDoc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const downloadCSVFromBlob = (blob, fileName) => {
    const downloadUrl = window.URL.createObjectURL(blob);
    // Create a temporary anchor element and trigger a download
    const link = document.createElement("a");
    link.href = downloadUrl;
    const date = new Date();

    link.setAttribute(
      "download",
      `${fileName}School${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getHours()}:${date.getMinutes()}.csv`
    ); // or dynamically set the filename based on content-disposition header
    document.body.appendChild(link); // Append to the document
    link.click(); // Programmatically click the link to trigger the download

    // Clean up: remove the link and revoke the object URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  };

  const triggerCsvDownload = async () => {
    try {
      console.log(school);
      const res = await axios.get(
        `${BASE_URL}subjectTime/learningReportCSVForSchool/${school}`,
        {
          responseType: "blob",
        }
      );
      const blob = res.data;
      downloadCSVFromBlob(blob, "LearningReport");

      const res2 = await axios.get(
        `${BASE_URL}studentTest/testReportCSVForSchool/${school}`,
        {
          responseType: "blob",
        }
      );
      const blob2 = res2.data;
      downloadCSVFromBlob(blob2, "TestReport");
    } catch (error) {
      console.log(error);
    }
  };

  const syncDataApi = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${SYNC_URL}syncData`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  

  return (
    <>
    <LoadingOverlay
      active={loading}
      spinner
      text="Syncing data"
    >
    <div className="flex justify-between items-center my-5">
        <div>
          {/* <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold">
            <span className="text-orange-400">Welcome</span>{" "}
            <span>
              {role === "INSTRUCTOR" && user && (
                <span>
                  {user?.username.charAt(0).toUpperCase() +
                    user?.username.slice(1)}
                </span>
              )}
            </span>
          </h1> */}
        </div>
        <div>
          <div className="flex justify-center items-center my-5 static">
            
               <img src={Img2} alt="" className="lg:h-16 md:h-12 h-10 " />
         
            <img src={Slogan} alt="" className="lg:h-16 md:h-12 h-10" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-3/4">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-5 ">
            <div
              className=" grid place-items-center shadow-xl rounded-2xl p-5 border hover:scale-105 hover:shadow-2xl hover:shadow-orange-200 transition duration-300 ease-in-out"
              onClick={() => triggerCsvDownload()}
            >
              <img src={Expimg} alt="" className="lg:h-32 md:h-24 h-14" />
              <p className="text-xl font-bold">Export Files</p>
              {/* <p className="text-gray-500">Instruction goes here</p> */}
            </div>
            
            <div
              className=" grid place-items-center shadow-xl rounded-2xl p-5 border hover:scale-105 hover:shadow-2xl hover:shadow-orange-200 transition duration-300 ease-in-out"
              onClick={() => navigate("/inst/LearningReport")}
            >
              <img src={Vresult} alt="" className="lg:h-32 md:h-24 h-14" />
              <p className="lg:text-xl text-base lg:font-bold sm:font-semibold">
                View Results
              </p>
              {/* <p className="text-gray-500">Instruction goes here</p> */}
            </div>
            <div
              className=" grid place-items-center shadow-xl rounded-2xl p-5 border hover:scale-105 hover:shadow-2xl hover:shadow-orange-200 transition duration-300 ease-in-out"
              onClick={() => navigate("/inst/editStudent  ")}
            >
              <img src={Cariculamv} alt="" className="lg:h-32 md:h-24 h-14" />
              <p className="lg:text-xl text-base lg:font-bold sm:font-semibold">
                Edit Student Profile
              </p>
              {/* <p className="text-gray-500">Instruction goes here</p> */}
            </div>
            <div
              className=" grid place-items-center shadow-xl rounded-2xl p-5 border hover:scale-105 hover:shadow-2xl hover:shadow-orange-200 transition duration-300 ease-in-out"
              onClick={() => syncDataApi()}
            >
              <img src={syncLogo} alt="" className="lg:h-32 md:h-24 h-14" />
              <p className="lg:text-xl text-base lg:font-bold sm:font-semibold">
                Sync Data
              </p>
              {/* <p className="text-gray-500">Instruction goes here</p> */}
            </div>
          </div>
        </div>
      </div>

    </LoadingOverlay>
     
    </>
  );
};

export default InstHome;
