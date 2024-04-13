import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SearchableDropdown from "../SearchableDropdown";
import { useNavigate } from "react-router";
import SearchableMultiDropdown from "../SearchableMultiDropdown";

const AddInstructor = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [school, setSchool] = useState("");
  const [medium, setMedium] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  // const [selectedSchool, setSelectedSchool] = useState("NO");
  const [selectedSchool, setSelectedSchool] = useState(null); // Initialize selectedSchool as null
  const [dropSchool, setDropSchool] = useState([]);
  // console.log(selectedSchool);

  const handleSchoolChange = (selectedOptions) => {
    // selectedOptions will be an array of { value, label } objects
    setSelectedSchool(selectedOptions || []); // Handle null by setting to empty array
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, lastName, email, password, school, medium);
    const reqbody = {
      firstName: name,
      lastName: lastName,
      middleName: middleName,
      email: email,
      phone,
      qualification,
      password: password,
      gender: gender,
      // school: selectedSchool,
      school: selectedSchool.map(school => school.id),// Access value property of selectedSchool

      medium: Array.isArray(selectedSchool) ? selectedSchool[0].value : `ENGLISH`,
    };

    console.log(reqbody);

    try {
      const res = await axios.post(
        `${BASE_URL}instructor/addInstructor`,
        reqbody
      );
      console.log(res.data);
      alert("instructor added sucessfully");
      navigate("/admin/allInstructor");
    } catch (error) {
      console.log(error);
      alert("instructor could not be added");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMedium = (e) => {
    setMedium(e.target.value);
  };

  // const fetchSchool = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}school/getAllSchools`);
  //     console.log(res.data.schools);
  //     setDropSchool(res.data.schools);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchSchool = async () => {
    try {
      const res = await axios.get(`${BASE_URL}school/getAllSchools`);
      console.log(res.data.schools);
      const transformedSchools = res.data.schools.map((school) => ({
        // value: school._id,
        value: school.medium,
        district: school.district,
        label: school.name + " " + school.district,
        id: school._id,
      }));
      setDropSchool(transformedSchools);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSchool();
  }, []);

  return (
    <>
      <div className="my-5">
        <p className="font-semibold text-2xl">Add Instructor</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                First Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="First Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Middle Name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Middle Name"
                required
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Last Name"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <select
                name=""
                id=""
                className="mt-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="NONE">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                required
                // onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="qualification"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Qualification"
                onChange={(e) => setQualification(e.target.value)}
                required
                // onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="John"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="•••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="cnfrmp"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cnfrmp"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="•••••••••"
              required
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
          {password != confPassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium">Passwords Don't match</span>
            </div>
          ) : (
            ``
          )}
          <div className="">
          <label
              htmlFor="schoolMul"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              School
            </label>
            <SearchableMultiDropdown
              options={dropSchool}
              onChange={handleSchoolChange} // 
              placeholder="Select School"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
          <div className="flex justify-center items-center">
            {/* <label
              htmlFor="school"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              School
            </label>
            <input
              type="text"
              id="school"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="school"
              required
              onChange={(e) => setSchool(e.target.value)}
            /> */}
            {/* <select
              className="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setSelectedSchool(dropSchool[e.target.value]);
                console.log(dropSchool[e.target.value]);
              }}
            >
              <option value="NO">Select School</option>
              {Array.isArray(dropSchool) &&
                dropSchool?.map((school, index) => (
                  <option key={index} value={index}>
                    {school?.name} {school?.district}
                  </option>
                ))}
            </select> */}
          </div>
          <div>
            {/* <label
              htmlFor="medium"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Medium
            </label> */}
            {/* <select
              id="medium"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={medium}
              onChange={handleMedium}
            >
              <option selected>Choose a medium</option>
              <option value="ENGLISH">English</option>
              <option value="KANNADA">Kannada</option>
              <option value="MALYALAM">Malyalam</option>
              <option value="TELUGU">Telugu</option>
            </select> */}
            {/* <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              
              {selectedSchool ? <p>{selectedSchool?.value}</p> : ``}
            </div> */}
          </div>
        </div>
        <div className="flex justify-start items-center">
          <button
            type="submit"
            className="mt-5 text-orange-500  hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Add Instructor
          </button>
        </div>
      </form>
    </>
  );
};

export default AddInstructor;
