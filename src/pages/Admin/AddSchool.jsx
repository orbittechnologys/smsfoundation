import React, { useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";

const AddSchool = () => {
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState(Number);
  const [Internet, setInternet] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [medium, setMedium] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      schoolName,
      address,
      principalName,
      district,
      pincode,
      Internet,
      syllabus,
      medium
    );

    const reqbody = {
      name: schoolName,
      address: address,
      principalName: principalName,
      district: district,
      pincode: parseInt(pincode),
      Internet: Internet,
      syllabus: syllabus,
      medium: medium,
    };
    try {
      const res = await axios.post(`${BASE_URL}school/addSchool`, reqbody);
      console.log(res.data);
      alert("school added sucessfully");
    } catch (error) {
      console.log(error);
      alert("school could not be added");
    }
  };

  const handleMedium = (e) => {
    setMedium(e.target.value);
  };

  const handleSyllabus = (e) => {
    setSyllabus(e.target.value);
  };

  const handleInternet = (e) => {
    setInternet(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-5">
          <div>
            <label
              htmlFor="school_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              School Name
            </label>
            <input
              type="text"
              id="school_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="School Name"
              required
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="principal_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Principal Name
            </label>
            <input
              type="text"
              id="principal_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Principal Name"
              required
              onChange={(e) => setPrincipalName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="School address goes here"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="district"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="district"
              required
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="pincode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="pincode"
              required
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className="">
            <p className="text-xl font-semibold my-5 ">Internet Access</p>
            <div className="flex flex-wrap">
              <div className="flex items-center me-4">
                <input
                  id="yes"
                  type="radio"
                  value="Yes"
                  name="Internet"
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleInternet}
                />
                <label
                  htmlFor="yes"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id="no"
                  type="radio"
                  value="No"
                  name="Internet"
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleInternet}
                />
                <label
                  htmlFor="no"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold my-5">Medium</p>
            <div className="flex gap-5">
              <div>
                <select
                  id="language"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleMedium}
                  value={medium}
                >
                  <option selected value="">
                    Choose a Language
                  </option>
                  <option value="ENGLISH">English</option>
                  <option value="KANNADA">Kannada</option>
                  <option value="TELUGU">Telugu</option>
                  <option value="MARATHI">Marathi</option>
                </select>
              </div>
              <div>
                <select
                  id="board"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleSyllabus}
                  value={syllabus}
                >
                  <option selected value="">
                    Choose a Board
                  </option>
                  <option value="NCERT">NCERT</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="NIOS">NIOS</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="grid place-items-center">
          <button
            type="submit"
            className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddSchool;
