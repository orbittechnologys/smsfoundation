import React, { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";

const UpdateContentad = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    } else {
      // Handle invalid file type
      alert("Please upload a PDF file.");
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-5">
        <div className="border shadow-md p-5 rounded-xl grid gap-5">
          <div>
            <label
              htmlFor="standard"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Standard
            </label>
            <input
              type="text"
              id="standard"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder=""
              required
            />
          </div>
          <div>
            <label
              htmlFor="medium"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Medium
            </label>
            <select
              id="medium"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Choose a medium</option>
              <option value="EN">English</option>
              <option value="KA">Kannada</option>
              <option value="ML">Malyalam</option>
              <option value="TL">Telgu</option>
            </select>
          </div>
        </div>
        <div className="border shadow-md p-5 rounded-xl grid gap-5">
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder=""
              required
            />
          </div>
          <div>
            <label
              htmlFor="syllabus"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Syllabus
            </label>
            <select
              id="syllabus"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Choose a Syllabus</option>
              <option value="NC">NCERT</option>
              <option value="KD">KUD</option>
              <option value="CB">CBSE</option>
              <option value="AS">IAS</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-5 grid grid-cols-2 gap-5 shadow-lg p-5 border rounded-xl">
          <div>
            <label
              htmlFor="desc"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Description
            </label>
            <input
              type="text"
              id="desc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Study material for class 9th"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <div>
              <label
                htmlFor="cont"
                className="block mb-2 text-sm font-semibold text-gray-900 "
              >
                Upload Content
              </label>
              <input
                type="file"
                id="cont"
                accept="application/pdf"
                onChange={handleFileChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Upload Content"
                required
              />
            </div>
            <button
              onClick={() => document.getElementById("cont").click()}
              className="mt-5 ml-5"
            >
              <FaSquarePlus className="text-xl" />
            </button>
          </div>
          {fileName && (
            <div className="grid mt-2">
              <FaFilePdf className="text-red-500 text-2xl mr-2" />
              <span>{fileName}</span>
            </div>
          )}
        </div>
        <div className="flex justify-end items-center">
          <button
            type="button"
            className="mt-5 text-orange-500 font-semibold hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateContentad;
