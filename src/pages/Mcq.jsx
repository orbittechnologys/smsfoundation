import React from "react";
import { IoMdStopwatch } from "react-icons/io";

const Mcq = () => {
  return (
    <>
      <div className="flex justify-between px-5 py-5 my-5 bg-[#140342]">
        <div className="text-white">
          <p className="text-xl font-semibold">Course Name</p>
          <p>Test Description</p>
        </div>
        <div className="flex justify-center items-center">
          <IoMdStopwatch className="mr-2 text-orange-500" />
          <p className="text-white font-semibold">40.00</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mx-10">
          <div>
            <p>02/20</p>
          </div>
          <div>
            <p>skip</p>
          </div>
        </div>
        <div className="mx-10 my-5">
          <div className="border border-gray-500 p-5 rounded-xl">
            <p>02. The Flight _____ at 6:10 has been delayed.</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <div className="border border-gray-500 p-5 rounded-xl">
              <p>A. leave</p>
            </div>
            <div className="border-2 border-green-800 p-5 rounded-xl">
              <p>B. Which leave</p>
            </div>
            <div className="border border-gray-500 p-5 rounded-xl">
              <p>A. leaving</p>
            </div>
            <div className="border border-gray-500 p-5 rounded-xl">
              <p>A. left</p>
            </div>
          </div>
        </div>
        <div className="mx-10">
          <button
            type="button"
            className="mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
          >
            Previous
          </button>
          <button
            type="button"
            className="mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Mcq;
