import React, { useEffect, useState } from "react";
import Slogan from "../../assets/slogan.png";
import Img2 from "../../assets/img2.png";
import Expimg from "../../assets/export 1.png";
import Uploadimg from "../../assets/file-upload 1.png";
import Vresult from "../../assets/result 1.png";
import Cariculamv from "../../assets/curriculum-vitae 1.png";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router";

const InstHome = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center my-5">
        <div>
          <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold">
            <span className="text-orange-400">Welcome</span>{" "}
            <span>
              {role === "INSTRUCTOR" && user && (
                <span>
                  {user?.username.charAt(0).toUpperCase() +
                    user?.username.slice(1)}
                </span>
              )}
            </span>
          </h1>
        </div>
        <div>
          <div className="flex justify-center items-center my-5 static">
            <img src={Img2} alt="" className="lg:h-16 md:h-12 h-10" />
            <img src={Slogan} alt="" className="lg:h-16 md:h-12 h-10" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-3/4">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-5 ">
            <div className=" grid place-items-center shadow-xl rounded-2xl p-5 border">
              <img src={Expimg} alt="" className="lg:h-32 md:h-24 h-14" />
              <p className="lg:text-xl text-base lg:font-bold sm:font-semibold">
                Export Files
              </p>
              {/* <p className="text-gray-500">Instruction goes here</p> */}
            </div>
            {/* <div className=" grid place-items-center shadow-xl rounded-2xl p-5 border ">
              <img src={Uploadimg} alt="" />
              <p className="text-xl font-bold">Upload Content</p>
              <p className="text-gray-500">Instruction goes here</p>
            </div> */}
            <div
              className=" grid place-items-center shadow-xl rounded-2xl p-5 border"
              onClick={() => navigate("/inst/LearningReport")}
            >
              <img src={Vresult} alt="" className="lg:h-32 md:h-24 h-14" />
              <p className="lg:text-xl text-base lg:font-bold sm:font-semibold">
                View Results
              </p>
              {/* <p className="text-gray-500">Instruction goes here</p> */}
            </div>
            <div
              className=" grid place-items-center shadow-xl rounded-2xl p-5 border"
              onClick={() => navigate("/inst/editStudent  ")}
            >
              <img src={Cariculamv} alt="" className="lg:h-32 md:h-24 h-14" />
              <p className="lg:text-xl text-base lg:font-bold sm:font-semibold">
                Edit Student Profile
              </p>
              {/* <p className="text-gray-500">Instruction goes here</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstHome;
