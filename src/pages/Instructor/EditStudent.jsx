import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";

const EditStudent = () => {
  const [query, setQuery] = useState("");
  const [instructor, setInstructor] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [standard, setStandard] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [getAllStudents, setGetAllStudents] = useState([]);
  const [uniqueIds, setUniqueIds] = useState({});

  const fetchInstructorByUserId = async (userId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}instructor/getByUserId/${userId}`
      );
      setInstructor(res.data.instructorDoc);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentsBySchool = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentsBySchool/${instructor?.school?._id}`
      );
      setGetAllStudents(res.data.students);
      setStudents(res.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudentsByInstructor = async (instructorId) => {
    try {
      if (instructorId) {
        const res = await axios.get(
          `${BASE_URL}instructor/fetchStudents/${instructorId}`
        );
        setGetAllStudents(res.data.students);
        setStudents(res.data.students);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    fetchInstructorByUserId(userId);
  }, []);

  useEffect(() => {
    if (instructor) {
      fetchStudentsByInstructor(instructor._id);
    }
  }, [instructor]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.get(`${BASE_URL}student/getStudentQuerySchool`, {
  //       headers: {
  //         query: query,
  //         school: instructor?.school?._id,
  //       },
  //     });
  //     console.log(res.data);
  //     setStudents(res.data.students);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${BASE_URL}student/getStudentQuerySchool`, {
        headers: {
          query: query,
          school: instructor?.school?._id,
        },
      });
      setStudents(res.data.students);

      // Update unique IDs for searched students
      const generatedIds = {};
      res.data.students.forEach((student) => {
        const uniqueId = generateUniqueId(student);
        console.log("Student ID:", student._id);
        console.log("Unique ID:", uniqueId);
        generatedIds[student._id] = uniqueId;
      });
      console.log("Generated IDs:", generatedIds);
      setUniqueIds(generatedIds);
    } catch (error) {
      console.log(error);
    }
  };

  const populateEmailPhone = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}user/id/${userId}`);
      console.log(res.data.userDoc);
      setEmail(res.data.userDoc.email);
      setPhone(res.data.userDoc.phone);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentSelect = (student) => {
    populateEmailPhone(student?.user);
    setSelectedStudent(student);
    setFirstName(student?.firstName || "");
    setLastName(student?.lastName || "");
    setRollNo(student?.rollNo || "");
    setStandard(student?.standard || "");
  };

  const handleStudentUpdate = async (e) => {
    e.preventDefault();
    const reqBody = {
      studentId: selectedStudent?._id,
      firstName: firstName,
      lastName: lastName,
      rollNo: rollNo,
      standard: standard,
      email,
      phone,
    };

    try {
      const res = await axios.post(`${BASE_URL}student/updateStudent`, reqBody);
      console.log(res.data);
      alert("Student Updated successfully");
      setSelectedStudent(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const reqBody = {
      studentId: selectedStudent?._id,
      newPassword: password,
    };

    try {
      const res = await axios.post(`${BASE_URL}student/resetPassword`, reqBody);
      console.log(res.data);
      alert("Password changed successfully");
      setSelectedStudent(null);
    } catch (error) {
      console.log(error);
    }
  };

  const generateUniqueId = (student) => {
    console.log("Student:", student);
    if (student && student.firstName && student.lastName) {
      const firstNameInitial = student.firstName.charAt(0);
      const lastNameInitials = student.lastName
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");

      const randomNumber = Math.floor(Math.random() * 900) + 100;

      return `${firstNameInitial}${lastNameInitials}-${randomNumber}`;
    }

    // Return a default value if required properties are not available
    return "N/A";
  };

  useEffect(() => {
    if (students.length > 0) {
      const generatedIds = {};
      students.forEach((student) => {
        const uniqueId = generateUniqueId(student);
        generatedIds[student._id] = uniqueId;
      });
      setUniqueIds(generatedIds);
    }
  }, [students]);

  return (
    <div className="mx-auto">
      <form className="max-w-md mx-auto my-5" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search for Student"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>
      <div className="max-w-md mx-auto my-5">
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-sm text-gray-600 font-medium border">
                Name
              </th>
              <th className="py-3 px-4 text-sm text-gray-600 font-medium border">
                Roll No
              </th>
              <th className="py-3 px-4 text-sm text-gray-600 font-medium border">
                Standard
              </th>
              <th className="py-3 px-4 text-sm text-gray-600 font-medium border">
                Unique Id
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                onClick={() => handleStudentSelect(student)}
                className="cursor-pointer hover:bg-gray-100 border-b text-center"
              >
                <td className="py-3 px-4 text-sm text-gray-900 font-normal border">
                  {student.firstName} {student.lastName}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900 font-normal border">
                  {student.rollNo}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900 font-normal border">
                  {student.standard}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900 font-normal border">
                  {uniqueIds[student._id]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent ? (
        <form
          onSubmit={handleStudentUpdate}
          className="grid grid-cols-2 gap-5 my-5 bg-gray-200 rounded-lg p-5 lg:w-1/2 mx-auto"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
              placeholder="Roll No"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="standard"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Standard
            </label>
            <input
              type="number"
              placeholder="Standard"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>
            <label
              htmlFor="standard"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>
            <label
              htmlFor="standard"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Phone
            </label>
            <input
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        ``
      )}

      {selectedStudent ? (
        <form
          onSubmit={handleResetPassword}
          className="bg-gray-200 rounded-lg p-5 lg:w-1/2 mx-auto"
        >
          <div>
            <label
              htmlFor="rest_password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Reset Password
            </label>
            <input
              type="password"
              placeholder="Enter new Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-5"
              type="submit"
            >
              {" "}
              Reset Password
            </button>
          </div>
        </form>
      ) : (
        ``
      )}
    </div>
  );
};

export default EditStudent;
