import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import SearchableDropdown from "../SearchableDropdown";
import { useNavigate } from "react-router";

const addStudent = () => {
  const [name, setName] = useState("");
  const [lastName, setsetLastName] = useState("");
  const [middleName,setMiddleName] = useState("");
  const [gender,setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword,setConfPassword] = useState("");
  const [school, setSchool] = useState("");
  const [medium, setMedium] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [standard, setStandard] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("NO");
  const [dropSchool, setDropSchool] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [role, setRole] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      email,
      name,
      lastName,
      rollNo,
      standard,
      selectedSchool,
      instructor,
      password
    );

    const reqbody = {
      email: email,
      firstName: name,
      lastName: lastName,
      middleName,
      gender,
      phone,
      rollNo: rollNo,
      standard: standard,
      // school: selectedSchool?._id,
      password: password,
      school: role === "INSTRUCTOR" ? instructor?._id : selectedSchool?.id,
      syllabus:
        role === "INSTRUCTOR" ? instructor?.syllabus : selectedSchool?.syllabus,
      medium:
        role === "INSTRUCTOR" ? instructor?.medium : selectedSchool?.value,
    };
    console.log(reqbody);

    try {
      const res = await axios.post(`${BASE_URL}student/addStudent`, reqbody);
      console.log(res.data);
      alert("student added sucessfully");
      const navUrl = role == "INSTRUCTOR" ? "/instructor/AllStudents" : "/admin/AllStudents"
      navigate(navUrl);
    } catch (error) {
      console.log(error);
      alert("student could not be added");
    }
  };
  const handleMedium = (e) => {
    setMedium(e.target.value);
  };

  const fetchSchool = async () => {
    try {
      const res = await axios.get(`${BASE_URL}school/getAllSchools`);
      console.log(res.data.schools);
      const transformedSchools = res.data.schools.map((school) => ({
        // value: school._id,
        value: school.medium,
        district: school.district,
        label: school.name + " "+school.district,
        syllabus: school.syllabus,
        id : school._id,
      }));
      setDropSchool(transformedSchools);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInstructor = async () => {
    try {
      const userId = sessionStorage.getItem("user_id");
      setRole(sessionStorage.getItem("role"));
      const res = await axios.get(
        `${BASE_URL}instructor/getByUserId/${userId}`
      );
      console.log(res.data.instructorDoc.school);
      setInstructor(res.data.instructorDoc.school);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSchool();
    fetchInstructor();
  }, []);

  return (
    <>
      <div className="flex justify-start items-center">
        <div className="flex mx-5 my-5 ">
          <p className="font-bold text-lg">Add Student</p>
        </div>
      </div>

      <div>
        <form className="1" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="middlename"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Middle Name
              </label>
              <input
                type="text"
                id="middlename"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                
                required
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                onChange={(e) => setsetLastName(e.target.value)}
              />
            </div>

           

            <div>
              <select
                name=""
                id=""
                className="mt-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="NONE">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="rollno"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Roll No
              </label>
              <input
                type="text"
                id="rollno"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                onChange={(e) => setRollNo(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="phoneno"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone No
              </label>
              <input
                type="number"
                id="phoneno"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                required
                // onChange={(e) => setRollNo(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="cnfrmpswrd"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="text"
                id="cnfrmpswrd"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="standard"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Standard
              </label>
              <input
                type="number"
                id="standard"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                onChange={(e) => setStandard(e.target.value)}
              />
            </div>
            {role !== "INSTRUCTOR" && (
                          <div className="">
                          <label
                              htmlFor="standard"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              School
                            </label>
                          <SearchableDropdown
                            options={dropSchool}
                            onChange={setSelectedSchool} // Use setSelectedSchool directly
                            placeholder="Select School"
                          />
                        </div>
            )}

            {role !== "INSTRUCTOR" && (
              <div>
                <label
                  htmlFor="syllabus"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Syllabus
                </label>
                {/* <input
  type="text"
  id="syllabus"
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
  required
  onChange={(e) => setSyllabus(e.target.value)}
/> */}
                <div className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  {selectedSchool ? <p>{selectedSchool?.syllabus}</p> : ``}
                </div>
              </div>
            )}

            {role !== "INSTRUCTOR" && (
              <div>
                <label
                  htmlFor="medium"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Medium
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  {selectedSchool ? <p>{selectedSchool?.value}</p> : ``}
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default addStudent;
