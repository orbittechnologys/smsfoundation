import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import SearchableDropdown from "../SearchableDropdown";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddSchool = () => {
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [principalContact, setPrincipalContact] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState(Number);
  const [Internet, setInternet] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [medium, setMedium] = useState("");
  const [state, setState] = useState("");
  const [projectName, setProjectName] = useState("");
  const [partnerName, setPartnerName] = useState("");

  const [dropMedium, setDropMedium] = useState([]);
  const [dropSyllabus, setDropSyllabus] = useState([]);

  const [selectedMedium, setSelectedMedium] = useState(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMedium || !selectedSyllabus) {
      toast.error("Please fill all the details");
    } else {
      const reqbody = {
        name: schoolName,
        address: address,
        principalName: principalName,
        principalContact,
        district: district,
        state,
        projectName,
        partnerName,
        pincode: parseInt(pincode),
        internet: Internet,
        syllabus: selectedSyllabus.value,
        medium: selectedMedium.value,
      };
      try {
        const res = await axios.post(`${BASE_URL}school/addSchool`, reqbody);
        console.log(res.data);
        toast.success("School added successfully");
        setTimeout(() => {
          navigate('/Schools');
        }, 2000);
      } catch (error) {
        console.log(error);
        toast.error("School could not be added");
      }
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

  const fetchData = async () => {
    try {
      const res2 = await axios.get(`${BASE_URL}syllabus/getAll`);

      const transformedSyllabus = res2.data.syllabus.map((syllabus) => ({
        value: syllabus.name,
        label: syllabus.name,
        id: syllabus._id,
      }));

      setDropSyllabus(transformedSyllabus);

      const res3 = await axios.get(`${BASE_URL}medium/getAll`);

      const transformedMediums = res3.data.mediums.map((medium) => ({
        value: medium.name,
        label: medium.name,
        id: medium._id,
      }));

      setDropMedium(transformedMediums);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="my-5">
        <h1 className="text-lg text-orange-500 font-semibold">Add School</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-5">
          <div>
            <label
              htmlFor="school_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              School Name
            </label>
            <input
              type="text"
              id="school_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="School Name"
              required
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="principal_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Principal Name
            </label>
            <input
              type="text"
              id="principal_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Principal Name"
              required
              onChange={(e) => setPrincipalName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="principal_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Principal Contact
            </label>
            <input
              type="number"
              id="principal_contact"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Principal Contact"
              required
              onChange={(e) => setPrincipalContact(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="School address goes here"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="district"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              District
            </label>
            <input
              type="text"
              id="district"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="district"
              required
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="pincode"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="pincode"
              required
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              State
            </label>
            <input
              type="text"
              id="state"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="state"
              required
              onChange={(e) => setState(e.target.value.toUpperCase())}
            />
          </div>
          <div>
            <label
              htmlFor="project_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Project Name
            </label>
            <input
              type="text"
              id="project_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="project_name"
              required
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="partner_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Partner Name
            </label>
            <input
              type="text"
              id="partner_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="partner name"
              required
              onChange={(e) => setPartnerName(e.target.value)}
            />
          </div>
          <div className="">
            <p className="text-xl font-semibold my-5 ">Internet Access</p>
            <div className="flex flex-wrap">
              <div className="flex items-center me-4">
                <input
                  id="yes"
                  type="radio"
                  value={true}
                  name="Internet"
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 "
                  onChange={handleInternet}
                />
                <label
                  htmlFor="yes"
                  className="ms-2 text-sm font-medium text-gray-900 "
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id="no"
                  type="radio"
                  value={false}
                  name="Internet"
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 "
                  onChange={handleInternet}
                />
                <label
                  htmlFor="no"
                  className="ms-2 text-sm font-medium text-gray-900 "
                >
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-xl font-semibold my-5">Medium Board</p>
            <div className="flex gap-5">
              <div>
                <SearchableDropdown
                  options={dropMedium}
                  placeholder={"Search Medium"}
                  onChange={setSelectedMedium}
                />
              </div>
              <div>
                <div>
                  <SearchableDropdown
                    options={dropSyllabus}
                    placeholder={"Search Board"}
                    onChange={setSelectedSyllabus}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid place-items-center">
          <button
            type="submit"
            className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
          >
            Add School
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddSchool;
