import React from "react";
import Slogan from "../../assets/slogan.png";
import Img2 from "../../assets/img2.png";
import Expimg from "../../assets/export 1.png";
import Uploadimg from "../../assets/file-upload 1.png";
import Vresult from "../../assets/result 1.png";
import Cariculamv from "../../assets/curriculum-vitae 1.png";

const InstHome = () => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center my-5">
          <div>
            <h1 className="text-3xl font-semibold">
              <span className="text-orange-400">Welcome</span> Instructor
            </h1>
          </div>
          <div>
            <div className="flex justify-center items-center my-5 static">
              <img src={Img2} alt="" className="h-16" />
              <img src={Slogan} alt="" className="h-16" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2  gap-5 ">
          <div className=" grid place-items-center shadow-xl rounded-2xl p-5 border w-72">
            <img src={Expimg} alt="" />
            <p className="text-xl font-bold">Export Files</p>
            <p className="text-gray-500">Instruction goes here</p>
          </div>
          <div className=" grid place-items-center shadow-xl rounded-2xl p-5 border w-72">
            <img src={Uploadimg} alt="" />
            <p className="text-xl font-bold">Upload Content</p>
            <p className="text-gray-500">Instruction goes here</p>
          </div>
          <div className=" grid place-items-center shadow-xl rounded-2xl p-5 border w-72">
            <img src={Vresult} alt="" />
            <p className="text-xl font-bold">View Results</p>
            <p className="text-gray-500">Instruction goes here</p>
          </div>
          <div className=" grid place-items-center shadow-xl rounded-2xl p-5 border w-72">
            <img src={Cariculamv} alt="" />
            <p className="text-xl font-bold">Edit Student Profile</p>
            <p className="text-gray-500">Instruction goes here</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstHome;
