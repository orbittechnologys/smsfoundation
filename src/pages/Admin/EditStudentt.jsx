import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../constants";
import axios from "axios";
import SearchableDropdown from "../SearchableDropdown";

const EditStudentt = () => {
  const { studentId } = useParams();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [medium, setMedium] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [Class, setClass] = useState(Number);
  const [Syllabus, setSyllabus] = useState("");
  const [SchoolId, setSchoolId] = useState("");
  const [School, setSchool] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("NO");
  const [dropSchool, setDropSchool] = useState([]);

  const getStudentbyId = async () => {
    try {
      const res = await axios.get(`${BASE_URL}student/id/${studentId}`);
      console.log(res.data.studentDoc);
      setName(res.data.studentDoc.firstName);
      setLastName(res.data.studentDoc.lastName);
      setMedium(res.data.studentDoc.medium);
      setRollNo(res.data.studentDoc.rollNo);
      setClass(res.data.studentDoc.standard);
      setSyllabus(res.data.studentDoc.syllabus);
      setSchoolId(res.data.studentDoc.school);
    } catch (error) {
      console.log(error);
    }
  };

  const getSchoolbyId = async () => {
    try {
      const res = await axios.get(`${BASE_URL}school/id/${SchoolId}`);
      console.log(res.data.school);
      setSchool(res.data.school.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSchoolbyId();
    getStudentbyId();
    fetchSchool();
  }, []);

  const fetchSchool = async () => {
    try {
      const res = await axios.get(`${BASE_URL}school/getAllSchools`);
      console.log(res.data.schools);
      const transformedSchools = res.data.schools.map((school) => ({
        // value: school._id,
        value: school.medium,
        district: school.district,
        label: school.name + " " + school.district,
        syllabus: school.syllabus,
        id: school._id,
      }));
      setDropSchool(transformedSchools);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="my-5">
        <p className="font-semibold text-2xl">Edit Student</p>
      </div>
      <div>
        <form action="">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-5">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="medium"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Medium
              </label>
              <input
                type="text"
                id="medium"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Medium"
                required
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="rollno"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Roll No
              </label>
              <input
                type="text"
                id="rollno"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Roll No"
                required
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="class"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Class
              </label>
              <input
                type="text"
                id="class"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="class"
                required
                value={Class}
                onChange={(e) => setClass(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="syllabus"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Syllabus
              </label>
              <input
                type="text"
                id="syllabus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="syllabus"
                required
                value={Syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="syllabus"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                School Name
              </label>
              <input
                type="text"
                id="syllabus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="syllabus"
                required
                value={School}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
            <div className="">
              <label
                htmlFor="standard"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                School
              </label>
              <SearchableDropdown
                options={dropSchool}
                onChange={setSelectedSchool} // Use setSelectedSchool directly
                placeholder="Select School"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStudentt;
